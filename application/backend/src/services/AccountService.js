const Account = require('../models/Account');
const accountRepository = require('../repositories/accountRepository');

// This file contains all business logic related to Account objects.

class AccountService {
  static usernameExists = async (username) => await accountRepository.getKeyFromUsername(username) != undefined;
  static emailExists = async (email) => await accountRepository.getKeyFromEmail(email) != undefined;
  static accountExists = async (key) => await accountRepository.readAccount(key) != undefined;
  
  // 1) account registration logic. If the username and email are available and the two passwords match
  // create an account with the given course preference object (this is to save existing course prefs from before registering) 
  static async register (username, email, passOne, passTwo, coursePrefObject) {
    let errFlags = ["", "", ""];    // displayed errors upon failed login
    if (await this.usernameExists(username))  errFlags[0] = "* Username taken";
    if (await this.emailExists(email))        errFlags[1] = "* Email in use";
    if (passOne != passTwo)           errFlags[2] = "* Passwords do not match";

    // ensure no errors were found before writing to the database.
    if (errFlags.find(err=>err.includes("*"))) {
      return {key: undefined, errFlags: errFlags};
    } else {
      const newAccount = new Account(username, email, passOne, coursePrefObject ?? {});
      await accountRepository.writeAccount(newAccount);
      return {key: `${username}|${email}`, errFlags: errFlags};
    }
  }

  // 2) account login logic. If the username OR email matches an entry, and the password matches that respective entry,
  // return the key related for this account and the course preferences.
  static async login (idField, password) {
    const key = await accountRepository.getKeyFromUsername(idField) ?? await accountRepository.getKeyFromEmail(idField);
    
    let err;
    if (!key) {
      err = "* No account with this username/email exists.";
      return {key: undefined, prefs: undefined, err};
    } else {
      const accData = await accountRepository.readAccount(key);
      if (accData.password != password) {
        err = "* Password is incorrect.";
        return {key: undefined, prefs: undefined, err};
      }
      return {key: key, prefs: accData.coursePrefs, err: undefined};
    }   
    
  }

  // 3) update the preference object for a given account.
  static async storePrefsAndCustomActs(username, prefs, customActs){
    const account = Account.getInstance(await accountRepository.readAccount(username));
    account.coursePreferenceMap = prefs;
    account.customActivityList = customActs;
    await accountRepository.writeAccount(account);
  }
  
  // 4) friends list getter service
  static async getFriendslist(key){
    const accountData = await accountRepository.readAccount(key);
    return accountData.friends;
  }
  
  // 5) logic for sending friend request. takes in the sender key and the username of the reciever handles multiple 
  // errors and returns numerical values determining the repsonse, which will then be handled in the front end.
  static async sendFriendRequest(senderKey, receiverUsername) {
    const senderData = await accountRepository.readAccount(senderKey);
    if (!senderData) return `bad call: sender doesnt exist`;

    const sender = Account.getInstance(senderData);

    const receiverKey = await accountRepository.getKeyFromUsername(receiverUsername);
    if (!receiverKey) return 4;
    
    const receiver = Account.getInstance(await accountRepository.readAccount(receiverKey));

    if (receiver.friendsList && receiver.friendsList.includes(sender.username))
        return 3;
    
    if (receiver.requestList && receiver.requestList.includes(sender.username))
        return 2;
    
    // send a friend request to someone who has sent you a friend request, add eachother as friends.
    if (sender.requestList.includes(receiverUsername)) {
        
        sender.addFriend(receiverUsername);
        sender.removeRequest(receiverUsername);
        await accountRepository.writeAccount(sender);
        
        receiver.addFriend(sender.username);
        receiver.removeRequest(sender.username); // Add this line to remove the pending request from the receiver
        await accountRepository.writeAccount(receiver);
        return 0;
    } else {
        receiver.addRequest(sender.username);
        await accountRepository.writeAccount(receiver);
        return 1;
    }
  }

  // Given the username of the account (person accepting the request), and the username of the source of the request, add eachother too the friends lists.
  static async acceptFriendRequest(receiverUsername, senderUsername) {
    const receiverKey = await accountRepository.getKeyFromUsername(receiverUsername);
    if (!receiverKey) 
      throw new Error ("Invalid call!");
    const receiverData = await accountRepository.readAccount(receiverKey);
    const receiver = Account.getInstance(receiverData);
    
    const senderKey = await accountRepository.getKeyFromUsername(senderUsername);
    if (!senderKey)
      throw new Error("The user who sent this request cannot be found.");
    const senderData = await accountRepository.readAccount(senderKey);
    const sender = Account.getInstance(senderData);

    if (!receiver.requestList || !receiver.requestList.includes(senderUsername))
      throw new Error(`${senderUsername} has not sent a friend request.`);

    if (receiver.friendsList.includes(senderUsername))
      throw new Error(`${receiverUsername} is already your friend.`);
    
    // Add each other as friends
    sender.addFriend(receiverUsername);
    receiver.addFriend(senderUsername);
    
    // Remove the friend request from pendingRequests
    receiver.removeRequest(senderUsername);
    sender.removeRequest(receiverUsername);
    // Save the updated accounts back to the database
    await accountRepository.writeAccount(sender);
    await accountRepository.writeAccount(receiver);
  }

  static async removeFriend(username, friendUsername) {
    //Check if the user exists
    const userKey = await accountRepository.getKeyFromUsername(username);
    if (!userKey) 
        throw new Error("Invalid call!");

    const userData = await accountRepository.readAccount(userKey);
    const user = Account.getInstance(userData);
    //Check if the friend exists    
    const friendKey = await accountRepository.getKeyFromUsername(friendUsername);
    if (!friendKey)
        throw new Error("The user you are trying to remove does not exist.");
    const friendData = await accountRepository.readAccount(friendKey);
    const friend = Account.getInstance(friendData);

    if (!user.friendsList || !user.friendsList.includes(friendUsername))
        throw new Error(`${friendUsername} is not in your friends list.`);

    user.removeFriend(friendUsername);
    friend.removeFriend(username);

    await accountRepository.writeAccount(user);
    await accountRepository.writeAccount(friend);
  }
  
  static async denyFriendRequest(username, friendUsername) {
    //Check if the user exists
    const userKey = await accountRepository.getKeyFromUsername(username);
    if (!userKey) 
        throw new Error("Invalid call!");
    const userData = await accountRepository.readAccount(userKey);
    const sender = Account.getInstance(userData);

    //Check if the friend exists
    const friendKey = await accountRepository.getKeyFromUsername(friendUsername);
    if (!friendKey)
        throw new Error("The user you are trying to deny does not exist.");
    const friendData = await accountRepository.readAccount(friendKey);
    const receiver = Account.getInstance(friendData);
    if(!sender.requestList || !sender.requestList.includes(friendUsername))
        throw new Error(`${friendUsername} has not sent you a friend request.`);
    else if(sender.requestList.includes(friendUsername))
    {
      sender.removeRequest(friendUsername);
      receiver.removeRequest(username);
      await accountRepository.writeAccount(sender);
      await accountRepository.writeAccount(receiver);
    }
  }
  //#region - services used in development for quickly checking functionalities of friends list.
  static async getKeyFromUsername(username) {
    return await accountRepository.getKeyFromUsername(username);
  }

  static async clearFriendsList(key){
    const account = Account.getInstance(await accountRepository.readAccount(key));

    account.friendsList = [];
    
    await accountRepository.writeAccount(account);
  }

  static async getPendingList(key){
    const account = await accountRepository.readAccount(key);
    return account.requests;
  }

  //#endregion
}

module.exports = AccountService;
