const Account = require("../business-objects/Account");
const Database = require("../database/StubDatabase");

class AccountService {
  // this function saves an account to the DB
  static async createAccount(account) {
    if (Database.read("accounts", account.username) != null) {
      throw new Error("Account with username already exists.");
    } else {
      let key = account.username;
      let fields = {
        username: account.username,
        password: account.password,
        email: account.email,
        enrolements: account.enrolements,
        friends: account.friends,
        pendingRequests: account.pendingRequests,
      };
      Database.create("accounts", key, fields);
    }
  }
  // this function fetches user info from the DB based on a login.
  static async login(username, password) {
    let data = Database.read("accounts", username);
    if (!data) return null;
    if (password != data.password) throw new Error("Password is incorrect.");
    let { username, password, email, enrolements, friends } = data;
    return new Account(username, password, email, enrolements, friends);
  }
}
