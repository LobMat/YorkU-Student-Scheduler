const Account = require("../business-objects/Account");
const Database = require("../database/StubDatabase");

class AccountService {
  // this function just creates a new account with the info entered and saves it to the DB
  static async createAccount(account) {
    if (Database.read("accounts", account.username) != null) {
      throw new Error("Account with username already exists.");
    } else {
      let key = account.username;
      let fields = {
        username: account.username,
        password: account.password,
        email: account.email,
        enrolements: [],
        friends: [],
      };
      Database.create("accounts", key, fields);
    }
  }

  static async login(username, password) {
    let data = Database.read("accounts", username);
    if (!data) return null;
    if (password != data.password) throw new Error("Password is incorrect.");
    let { username, password, email, enrolements, friends } = data;
    return new Account(username, password, email, enrolements, friends);
  }
}
