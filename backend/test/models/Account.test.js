const { default: test } = require("node:test");
const Account = require("../../src/business-objects/Account");
// const { get } = require("http");
// const { AccountUtils } = require("../../src/models/Account");

test("Create a new account", () => {
  let newAccount = new Account(
    "mattthew",
    "123pass",
    "mattthew@hotmail.com",
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
    "123pass",
    "ahmetkrc@hotmail.com",
    [],
    []
  );
  newAccount.setPassword("newpass123");
  expect(newAccount.getPassword()).toBe("newpass123");
});

test("Add a friend to the account", () => {
  let newAccount = new Account(
    "ahmet",
    "123pass",
    "ahmetkrc@hotmail.com",
    [],
    []
  );
  newAccount.addFriend("john");
  expect(newAccount.getFriendList()).toContain("john");
});

test("Enroll in a course", () => {
  let newAccount = new Account(
    "ahmet",
    "123pass",
    "ahmetkrc@hotmail.com",
    [],
    []
  );
  newAccount.enrollCourse("EECS 2311");
  expect(newAccount.getEnrolledCourses()).toContain("EECS 2311");
});

test("Check pending list", () => {
  let newAccount = new Account(
    "ahmet",
    "123pass",
    "ahmetkrc@hotmail.com",
    [],
    []
  );
  newAccount2.addPendingRequest("john");
  expect(newAccount.getPendingRequests()).toContain("john");
});

