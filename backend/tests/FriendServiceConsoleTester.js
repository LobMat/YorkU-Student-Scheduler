import FriendService from "../src/services/FriendService.js";
import StubDatabase from "../src/database/StubDatabase.js";

// Initialize the database
await StubDatabase.init();

// Add some initial accounts to the database
const account1 = { username: "john", friends: [], pendingRequests: [] };
const account2 = { username: "doe", friends: [], pendingRequests: [] };
const account3 = { username: "joe", friends: [], pendingRequests: [] };
await StubDatabase.write("accounts", "john", account1);
await StubDatabase.write("accounts", "doe", account2);
await StubDatabase.write("accounts", "joe", account3);


async function runTests() {
  // Test: Sending a friend request
  console.log("\n--- Sending Friend Request ---");
  try {
    await FriendService.sendFriendRequest("john", "doe");
    console.log("Friend request sent from john to doe");
  } catch (error) {
    console.log("Error:", error.message);
  }

  // Test: Accepting a friend request
  console.log("\n--- Accepting Friend Request ---");
  try {
    await FriendService.acceptFriendRequest("john", "doe");
    console.log("Friend request accepted by doe");
  } catch (error) {
    console.log("Error:", error.message);
  }

  // Test: Getting friend list
  console.log("\n--- Getting Friend List ---");
  try {
    const friends = await FriendService.getFriendList("john");
    console.log("John's friends:", friends);
  } catch (error) {
    console.log("Error:", error.message);
  }

  // Test: Sending a duplicate friend request
  console.log("\n--- Sending Duplicate Friend Request ---");
  try {
    await FriendService.sendFriendRequest("john", "doe");
    console.log("Friend request sent from john to doe");
  } catch (error) {
    console.log("Error:", error.message);
  }

  // Test: Accepting a non-existent friend request
  console.log("\n--- Accepting Non-Existent Friend Request ---");
  try {
    await FriendService.acceptFriendRequest("doe", "john");
    console.log("Friend request accepted by john");
  } catch (error) {
    console.log("Error:", error.message);
  }

  // Test: Getting friend list for non-existent user
  console.log("\n--- Getting Friend List for Non-Existent User ---");
  try {
    const friends = await FriendService.getFriendList("nonexistent");
    console.log("Non-existent user's friends:", friends);
  } catch (error) {
    console.log("Error:", error.message);
  }

  //Test: Getting friend list for different users with different friends
  console.log("\n--- Getting Friend List ---");
  try{
    await FriendService.sendFriendRequest("john", "joe");
    await FriendService.acceptFriendRequest("john", "joe");
    const friends = await FriendService.getFriendList("doe");
    const friends2 = await FriendService.getFriendList("john");
    const friends3 = await FriendService.getFriendList("joe");
    console.log("Doe's friends:", friends);
    console.log("John's friends:", friends2);
    console.log("Joe's friends:", friends3);

  } catch (error) {
    console.log("Error:", error.message);  

  }

  //Test: Accepting friend requests if both persons send each other friend requests
    console.log("\n--- Bothaway Friend Request Auto Accept ---");
    try{
        await FriendService.sendFriendRequest("joe", "doe");
        await FriendService.sendFriendRequest("doe", "joe");
        const friends = await FriendService.getFriendList("doe");
        const friends2 = await FriendService.getFriendList("joe");
        console.log("Doe's friends:", friends);
        console.log("Joe's friends:", friends2);
    }
    catch (error) {
        console.log("Error:", error.message);
    }  
}
runTests();