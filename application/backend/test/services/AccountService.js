const Account = require('../../src/models/Account');
const AccountService = require('../../src/services/AccountService');
const accountRepository = require('../../src/repositories/accountRepository')
const StubDatabase = require('../../src/database/StubDatabase')

// this file contains test cases for Account business logic in the Service layer.  

// #region - registration service
test("Register 1 - successful registration.", async () => {
  StubDatabase.init();
  const{key, errFlags} = await AccountService.register('mattthews', 'matthew@yahoo.com', 'pass123', 'pass123');

  // check for expected returtn
  expect(errFlags).toStrictEqual(["", "", ""]);
  expect(key).toBe('mattthews|matthew@yahoo.com');

  // check for successful database write.
  data = await accountRepository.readAccount(key);
  expect(data).not.toBe(undefined);
  expect(data.password).toBe('pass123');

}) 

test("Register 2 - attempt to register an account with an existing username", async () => {
  StubDatabase.init();
  await AccountService.register('caleb', 'caleb@gmail.com', '123', '123');
  
  const {key, errFlags} = await AccountService.register('caleb', 'matthew@gmail.com', '123', '123');
  expect(errFlags).toStrictEqual(["* Username taken", "", ""]);
  expect(key).toBe(undefined)

})

test("Register 3 - attempt to register an account with an existing email", async () => {
  StubDatabase.init();
  await AccountService.register('caleb', 'caleb@gmail.com', '123', '123');
  
  const {key, errFlags} = await AccountService.register('matthew', 'caleb@gmail.com', '123', '123');
  expect(errFlags).toStrictEqual(["", "* Email in use", ""]);
  expect(key).toBe(undefined)
})

test("Register 4 - attempt to register an account with not matching password inputs", async () => {
  StubDatabase.init();
  const {key, errFlags} = await AccountService.register('caleb', 'caleb@gmail.com', '123', '1234');
  expect(errFlags).toStrictEqual(["", "", "* Passwords do not match"]);
  expect(key).toBe(undefined)
}) 

test("Register 5 - attempt to register an account with all errors", async () => {
  StubDatabase.init();
  await AccountService.register('caleb', 'caleb@gmail.com', '123', '123');

  const {key, errFlags} = await AccountService.register('caleb', 'caleb@gmail.com', '123', '1234');
  expect(errFlags).toStrictEqual(["* Username taken", "* Email in use", "* Passwords do not match"]);
  expect(key).toBe(undefined)
})

//#endregion

// #region - login service
test("Login 1 - login to an account that exists using the username", async () => {
  StubDatabase.init();
  const {key} = await AccountService.register('matthew', 'matthew@gmail.com', '123', '123');
  
  const ret = await AccountService.login('matthew', '123');
  const key2 = ret.key;
  const err = ret.err;

  expect(err).toBe(undefined);
  expect(key2).toBe(key);
  expect(key).toBe(await accountRepository.getKeyFromUsername('matthew'));
  expect(key2).toBe(await accountRepository.getKeyFromUsername('matthew'));
});

test("Login 2 - login to an account successfully using the email", async () => {
  StubDatabase.init();
  const {key} = await AccountService.register('matthew', 'matthew@gmail.com', '123', '123');
  
  const ret = await AccountService.login('matthew@gmail.com', '123');
  const key2 = ret.key;
  const err = ret.err;

  expect(err).toBe(undefined);
  expect(key2).toBe(key);
  expect(key).toBe(await accountRepository.getKeyFromEmail('matthew@gmail.com'));
  expect(key2).toBe(await accountRepository.getKeyFromEmail('matthew@gmail.com'));
});

test("Login 3 - try to login to an account with an ID that doesnt exist.", async () => {
  StubDatabase.init();
  const {key, err} = await AccountService.login('matthew', '123');

  expect(err).toBe("* No account with this username/email exists.");
  expect(key).toBe(undefined);
})

test("Login 4 - log in to an existing email/username with the wrong password.", async () => {
  StubDatabase.init();
  await AccountService.register('matthew', 'matthew@gmail.com', '123', '123');
  
  const ret1 = await AccountService.login('matthew', '1234');
  expect(ret1.err).toBe("* Password is incorrect.");
  expect(ret1.key).toBe(undefined);

  const ret2 = await AccountService.login('matthew@gmail.com', '1234');
  expect(ret2.err).toBe("* Password is incorrect.");
  expect(ret2.key).toBe(undefined);
})
// #endregion

test("storeCoursePrefs test", async () => {
  StubDatabase.init();

  //create and read account instance from database
  const {key} = await AccountService.register('matthew', 'matthew@gmail.com', '123', '123');
  const instance1 = Account.getInstance(key, await accountRepository.readAccount(key));

  expect(instance1.coursePreferenceMap).toStrictEqual({});
  await AccountService.storeCoursePrefs(key, ({
    //shortened version of prefrence data
    'EECS2311': {'sectionChoice': 0, 'uniqueActChoice': 0}
  }));
  const instance2 = Account.getInstance(key, await accountRepository.readAccount(key));

  expect(instance2.coursePreferenceMap).not.toStrictEqual({});
  expect(instance2.coursePreferenceMap['EECS2311']).toStrictEqual({'sectionChoice': 0, 'uniqueActChoice': 0});
});
