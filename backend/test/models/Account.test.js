const Account = require("../src/business-objects/Account");

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
