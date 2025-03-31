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
    if (!senderData) {
      console.error("Sender does not exist:", senderKey);
      return "bad call: sender doesnt exist";
    }
  
    const sender = Account.getInstance(senderData);
  
    const receiverKey = await accountRepository.getKeyFromUsername(receiverUsername);
    if (!receiverKey) {
      console.error("Receiver does not exist:", receiverUsername);
      return 4; // Receiver does not exist
    }
  
    const receiver = Account.getInstance(await accountRepository.readAccount(receiverKey));
  
    if (receiver.friendsList && receiver.friendsList.includes(sender.username)) return 3;
    if (receiver.requestList && receiver.requestList.includes(sender.username)) return 2;
  
    if (sender.requestList.includes(receiverUsername)) {
      sender.addFriend(receiverUsername);
      sender.removeRequest(receiverUsername);
      await accountRepository.writeAccount(sender);
  
      receiver.addFriend(sender.username);
      await accountRepository.writeAccount(receiver);
      return 0;
    } else {
      receiver.addRequest(sender.username);
      await accountRepository.writeAccount(receiver);
      return 1;
    }
  }

    static async acceptFriendRequest(key, senderUsername){
      const receiver = Account.getInstance(await accountRepository.readAccount(key));
      if (!receiver) throw new Error(`Receiver account with key ${key} does not exist.`);
    
      const senderKey = await accountRepository.getKeyFromUsername(senderUsername);
      if (!senderKey) throw new Error(`Sender with username ${senderUsername} does not exist.`);
    
      const sender = Account.getInstance(await accountRepository.readAccount(senderKey));
      if (!sender) throw new Error(`Sender account with key ${senderKey} does not exist.`);
    
      if (receiver.requestList && receiver.requestList.includes(senderUsername)) {
        receiver.addFriend(senderUsername);
        receiver.removeRequest(senderUsername);
        await accountRepository.writeAccount(receiver);
    
        sender.addFriend(receiver.username);
        await accountRepository.writeAccount(sender);
    
        return 0;
      } else {
        return 1;
      }
    }
  
    // Deny a friend request
    static async denyFriendRequest(key, senderUsername) {
      const receiver = Account.getInstance(await accountRepository.readAccount(key));
      if (!receiver) throw new Error(`Receiver account with key ${key} does not exist.`);
  
  
      if (receiver.requestList && receiver.requestList.includes(senderUsername)) {
        receiver.removeRequest(senderUsername);
  
        await accountRepository.writeAccount(receiver);
      } else {
        throw new Error(`Friend request from ${senderUsername} does not exist.`);
      }
    }
  
  // Remove a friend
    static async removeFriend(key, friendUsername) {

      const account = Account.getInstance(await accountRepository.readAccount(key));
      if (!account) throw new Error(`Account with key ${key} does not exist.`);

      const friendKey = await accountRepository.getKeyFromUsername(friendUsername);
      if (!friendKey) throw new Error(`Friend with username ${friendUsername} does not exist.`);
    
      const friendAccount = Account.getInstance(await accountRepository.readAccount(friendKey));
      if (!friendAccount) throw new Error(`Friend account with key ${friendKey} does not exist.`);

      account.removeFriend(friendUsername);
      friendAccount.removeFriend(account.username);

      await accountRepository.writeAccount(account);
      await accountRepository.writeAccount(friendAccount);
    }

  //#region - services used in development for quickly checking functionalities of friends list.
  static async getKeyFromUsername(username) {
    return await accountRepository.getKeyFromUsername(username);
  }

  static async clearFriendsList(key) {
    const account = Account.getInstance(await accountRepository.readAccount(key));

    account.friendsList = [];
    
    await accountRepository.writeAccount(account);
  }

  static async getPendingList(key) {
    const account = await accountRepository.readAccount(key);
    return account.requests;
  }
}
  //#endregion
module.exports = AccountService;
