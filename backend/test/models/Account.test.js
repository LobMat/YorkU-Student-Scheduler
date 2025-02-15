const { Account } = require("../../src/models/Account");

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

test("Remove a friend from the account", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    ["john"]
  );
  newAccount.removeFriend("john");
  expect(newAccount.getFriendList()).not.toContain("john");
});

test("Remove a pending request", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    [],
    ["john"]
  );
  newAccount.removePendingRequest("john");
  expect(newAccount.getPendingRequests()).not.toContain("john");
});

test("Get a friend from the friend list", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    ["john"]
  );
  expect(newAccount.getFriend("john")).toBe("john");
});

test("Check if a friend exists in the friend list", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    ["john"]
  );
  expect(newAccount.getFriendList()).toContain("john");
});

test("Check if a pending request exists in the pending list", () => {
  let newAccount = new Account(
    "ahmet",
    "ahmetkrc@hotmail.com",
    "123pass",
    [],
    [],
    ["john"]
  );
  expect(newAccount.getPendingRequests()).toContain("john");
});

