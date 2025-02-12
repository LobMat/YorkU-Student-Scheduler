const DatabaseInterface = require("./DatabaseInterface");

class StubDatabase extends DatabaseInterface {
  constructor() {
    super();
    this.accounts = [
      {
        username: "mattthew",
        password: "12345",
        courses: ["EECS 2101", "MATH 1310"],
      },
      {
        username: "sigmaboi",
        password: "123pxq79",
        courses: ["EECS 2311", "PHYS 1800"],
      },
      {
        username: "nonchalant",
        password: "dreadhead",
        courses: ["EECS 2021", "PHYS 2020"],
      },
    ];
  }
  addAccount(account) {
    if (account != undefined) {
      this.accounts.push(account);
    }
  }
  getAccountByUsername(username) {
    return this.accounts.find((account) => account.username === username);
  }
  updateAccount(username, account) {
    let removeIndex = this.accounts
      .map((item) => item.username)
      .indexOf(username);
    ~removeIndex && this.accounts.splice(removeIndex, 1);
    this.addAccount(account);
  }
  getAllAccounts() {
    return this.accounts;
  }
}

module.exports = StubDatabase;
