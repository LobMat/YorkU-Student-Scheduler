const Account = require("../business-objects/Account");
const Database = require("../database/StubDatabase");

class FriendService {

  // Method to send a friend request
  static async sendFriendRequest(senderUsername, receiverUsername) {
    let sender = await Database.read("accounts", senderUsername);
    let receiver = await Database.read("accounts", receiverUsername);

    if (!receiver) {
      throw new Error("The user you are trying to add does not exist.");
    }

    if (receiver.friends.includes(senderUsername)) {
      throw new Error(`${receiverUsername} is already your friend.`);
    }
    
    if (sender.pendingRequests.includes(receiverUsername)){
        console.log(`Friend request sent from ${senderUsername} to ${receiverUsername}`);
        await FriendService.acceptFriendRequest(receiverUsername, senderUsername);
        console.log(`Friend request accepted by ${receiverUsername}`);
    }

    if (receiver.pendingRequests && receiver.pendingRequests.includes(senderUsername)) {
        throw new Error("Friend request already sent.");
      }
 
    if (!receiver.pendingRequests) {
        receiver.pendingRequests = []; 
    }
      receiver.pendingRequests.push(senderUsername);

      await Database.write("accounts", receiverUsername, receiver);
  
      console.log(`Friend request sent from ${senderUsername} to ${receiverUsername}`);
    }

  // Method to accept a friend request
  static async acceptFriendRequest(senderUsername, receiverUsername) {
    let sender = await Database.read("accounts", senderUsername);
    let receiver = await Database.read("accounts", receiverUsername);

    if (!receiver) {
      throw new Error("The user doesn't exist.");
    }

    if (!receiver.pendingRequests || !receiver.pendingRequests.includes(senderUsername)) {
      throw new Error(`${senderUsername} has not sent a friend request.`);
    }

    if (receiver.friends.includes(senderUsername)) {
      throw new Error(`${receiverUsername} is already your friend.`);
    }

    // Add each other as friends
    sender.friends.push(receiverUsername);
    receiver.friends.push(senderUsername);

    // Remove the friend request from pendingRequests
    receiver.pendingRequests = receiver.pendingRequests.filter((req) => req !== senderUsername);

    // Save the updated accounts back to the database
    await Database.write("accounts", senderUsername, sender);
    await Database.write("accounts", receiverUsername, receiver);

    console.log(`${senderUsername} and ${receiverUsername} are now friends.`);
  }

  // Method to get the friend list
  static async getFriendList(username) {
    let account = await Database.read("accounts", username);

    if (!account) {
      throw new Error("User does not exist.");
    }

    return account.friends;
  }
}

module.exports = FriendService;
