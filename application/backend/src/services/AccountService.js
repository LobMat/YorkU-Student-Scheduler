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
  static async storeCoursePrefs(username, prefs){
    const account = Account.getInstance(username, await accountRepository.readAccount(username));
    account.coursePreferenceMap = prefs;
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

    const sender = Account.getAccountFromData(senderKey, senderData);

    const receiverKey = await accountRepository.getKeyFromUsername(receiverUsername);
    if (!receiverKey) return 4;
    
    const receiver = Account.getAccountFromData(receiverKey, await accountRepository.readAccount(receiverKey));

    if (receiver.friendsList && receiver.friendsList.includes(sender.username))
        return 3;
    
    if (receiver.pendingList && receiver.pendingList.includes(sender.username))
        return 2;
    
    // send a friend request to someone who has sent you a friend request, add eachother as friends.
    if (sender.pendingList.includes(receiverUsername)) {
        
        sender.addFriend(receiverUsername);
        sender.removePendingRequest(receiverUsername);
        await accountRepository.writeAccount(sender);
        
        receiver.addFriend(sender.username);
        await accountRepository.writeAccount(receiver);
        return 0;
    } else {
        receiver.addPendingRequest(sender.username);
        await accountRepository.writeAccount(receiver);
        return 1;
    }
  }

  //#region - services used in development for quickly checking functionalities of friends list.
  static async getKeyFromUsername(username) {
    return await accountRepository.getKeyFromUsername(username);
  }

  static async clearFriendsList(key){
    const account = Account.getAccountFromData(key, await accountRepository.readAccount(key));

    account.friendsList = [];
    
    await accountRepository.writeAccount(account);
  }

  static async getPendingList(key){
    const account = await accountRepository.readAccount(key);
    return account.pending;
  }
  static async writePrefs(username, prefs){
    const account = Account.getAccountFromData(username, await accountRepository.readAccount(username));
    account.coursePrefObject = prefs;
    console.log(account.coursePrefObject);
    await accountRepository.writeAccount(account);
  }
  //#endregion
}

module.exports = AccountService;
