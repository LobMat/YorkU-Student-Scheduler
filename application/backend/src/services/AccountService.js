const Account = require('../models/Account');
const accountRepository = require('../repositories/accountRepository');

// This file contains all business logic related to Account objects.

class AccountService {
  
  static usernameExists = async (username) => await accountRepository.getKeyFromUsername(username) != undefined;
  static emailExists = async (email) => await accountRepository.getKeyFromEmail(email) != undefined;

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
    } else {
      const accData = await accountRepository.readAccount(key);
      if (accData.password != password) 
        err = "* Password is incorrect.";
      }   
    return {key, err};
  }
}

module.exports = AccountService;
