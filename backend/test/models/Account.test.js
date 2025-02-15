// const { default: test } = require("node:test");
const { Account } = require("../../src/models/Account");
// const { get } = require("http");
// const { AccountUtils } = require("../../src/models/Account");

test("Create a new account", () => {
  let newAccount = new Account(
    "mattthew",
    "mattthew@hotmail.com",
    "123pass",
    [],
    []
  );
  expect(newAccount.getUsername()).toBe("mattthew");
  expect(newAccount.getPassword()).toBe("123pass");
  expect(newAccount.getEmail()).toBe("mattthew@hotmail.com");
  expect(newAccount.getEnrolledCourses()).toEqual([]);
  expect(newAccount.getFriendList()).toEqual([]);
});

test("Change account password", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    []
  );
  newAccount.setPassword("newpass123");
  expect(newAccount.getPassword()).toBe("newpass123");
});

test("Add a friend to the account", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    []
  );
  newAccount.addFriend("john");
  expect(newAccount.getFriendList()).toContain("john");
});

test("Check pending list", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    []
  );
  newAccount.addPendingRequest("john");
  expect(newAccount.getPendingRequests()).toContain("john");
});

