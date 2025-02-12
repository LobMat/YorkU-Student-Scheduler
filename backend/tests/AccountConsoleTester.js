const Account = require("../src/business-objects/Account"); // Import the Account class
const StubDatabase = require("../src/database/StubDatabase"); // Import the StubDatabase Class

// Create a test database instance
const database = new StubDatabase();

// Test: Creating a new account
console.log("\n--- Creating New Account ---");
let account1 = Account.makeNewAccount("user123", "pass123", database);
if (account1) {
  database.addAccount(account1);
  console.log("Account created:", account1);
}

// Test: Attempting to create a duplicate account
console.log("\n--- Creating Duplicate Account ---");
let account2 = Account.makeNewAccount("sigmaboi", "999999", database);
console.log("Should fail:", account2);

// Test: Logging in with correct credentials
console.log("\n--- Logging In ---");
let loggedInAccount = Account.login("mattthew", "12345", database);
console.log("Logged in:", loggedInAccount);

// Test: Logging in with incorrect password
console.log("\n--- Logging In with Incorrect Password ---");
let failedLogin = Account.login("nonchalant", "wrongpass", database);
console.log("Should be undefined:", failedLogin);

// Test: Changing username
console.log("\n--- Changing Username ---");
if (loggedInAccount) {
  loggedInAccount.username = "newUser123";
  database.updateAccount("mattthew", loggedInAccount);
  console.log("Username changed to:", loggedInAccount.username);
}

// Test: Changing password
console.log("\n--- Changing Password ---");
if (loggedInAccount) {
  loggedInAccount.password = "newPass123";
  database.updateAccount("newUser123", loggedInAccount);
  console.log("Password changed successfully.");
}

// Test: Logging in with updated credentials
console.log("\n--- Logging In with New Credentials ---");
let updatedLogin = Account.login("newUser123", "newPass123", database);
console.log("Logged in with new credentials:", updatedLogin);

// Test: Displaying all accounts
console.log("\n--- Displaying All Current Accounts ---");
console.log("All the account data:\n", database.getAllAccounts());
