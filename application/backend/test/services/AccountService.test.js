const Account = require('../../src/models/Account');
const AccountService = require('../../src/services/AccountService');
const accountRepository = require('../../src/repositories/accountRepository')
const StubDatabase = require('../../database/StubDatabase')

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

test("storePreferences test", async () => {
  StubDatabase.init();

  //create and read account instance from database
  const {key} = await AccountService.register('matthew', 'matthew@gmail.com', '123', '123');
  const instance1 = Account.getInstance(key, await accountRepository.readAccount(key));

  expect(instance1.coursePreferenceMap).toStrictEqual({});
  await AccountService.storePrefsAndCustomActs(key, ({
    //shortened version of prefrence data
    'EECS2311': {'sectionChoice': 0, 'uniqueActChoice': 0},
  }), []);
  const instance2 = Account.getInstance(key, await accountRepository.readAccount(key));

  expect(instance2.coursePreferenceMap).not.toStrictEqual({});
  expect(instance2.coursePreferenceMap['EECS2311']).toStrictEqual({'sectionChoice': 0, 'uniqueActChoice': 0});
});

//#region - friend request logic tests
test("Make a proper friend request call.", async () => {
  StubDatabase.init();

   // write the accounts
  const tempAccount1 = new Account('Ahmet', 'ahmetkrc@gmail.com', 'pass123');
  const tempAccount2 = new Account('Kunle', 'kunle@gmail.com', 'pass123');
  await accountRepository.writeAccount(tempAccount1);
  await accountRepository.writeAccount(tempAccount2);

  const exit = await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  expect(exit).toBe(1);
  
  const account1 = Account.getInstance('Kunle|kunle@gmail.com', await accountRepository.readAccount('Kunle|kunle@gmail.com'));
  expect(account1.requestList.length).toBe(1);
  expect(account1.requestList[0]).toBe('Ahmet');
});

test("Make a friend request call where the sender already has recieved a request from the reciever." , async () => {
  StubDatabase.init();

   // write the accounts
  const tempAccount1 = new Account('Ahmet', 'ahmetkrc@gmail.com', 'pass123');
  const tempAccount2 = new Account('Kunle', 'kunle@gmail.com', 'pass123');
  await accountRepository.writeAccount(tempAccount1);
  await accountRepository.writeAccount(tempAccount2);

  // ahmet sends kunle a friend request
  await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  //kunle sends ahmet a friend request
  const exit = await AccountService.sendFriendRequest('Kunle|kunle@gmail.com', 'Ahmet');
  expect(exit).toBe(0);

  // they should now be on eachothers friends list
  const account1 = Account.getInstance('Kunle|kunle@gmail.com', await accountRepository.readAccount('Kunle|kunle@gmail.com'));
  expect(account1.requestList.length).toBe(0);
  expect(account1.friendsList.length).toBe(1);
  expect(account1.friendsList[0]).toBe('Ahmet');
  
  const account2 = Account.getInstance('Ahmet|ahmetkrc@gmail.com', await accountRepository.readAccount('Ahmet|ahmetkrc@gmail.com'));
  expect(account2.requestList.length).toBe(0);
  expect(account2.friendsList.length).toBe(1);
  expect(account2.friendsList[0]).toBe('Kunle');
});

test("Make a friend request call where the sender does not exist" , async () => {
  StubDatabase.init();
  const tempAccount2 = new Account('Kunle', 'kunle@gmail.com', 'pass123');
  await accountRepository.writeAccount(tempAccount2);

  const exit = await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  expect(exit).toBe('bad call: sender doesnt exist');

  const account1 = Account.getInstance('Kunle|kunle@gmail.com', await accountRepository.readAccount('Kunle|kunle@gmail.com'));
  expect(account1.requestList.length).toBe(0);
  expect(account1.requestList[0]).toBe(undefined);
});

test("Make a friend request call where the reciever does not exist" , async () => {
  StubDatabase.init();
  const tempAccount1 = new Account('Ahmet', 'ahmetkrc@gmail.com', 'pass123');
  await accountRepository.writeAccount(tempAccount1);

  const exit = await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  expect(exit).toBe(4);
});

test("Make a friend request call where the sender has already sent a request to this user" , async () => {
  StubDatabase.init();
  
  const tempAccount1 = new Account('Ahmet', 'ahmetkrc@gmail.com', 'pass123');
  const tempAccount2 = new Account('Kunle', 'kunle@gmail.com', 'pass123');
  await accountRepository.writeAccount(tempAccount1);
  await accountRepository.writeAccount(tempAccount2);
  

  await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  const exit = await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  
  expect(exit).toBe(2);
});

test("Make a friend request call where the sender is already friends with this user" , async () => {
  StubDatabase.init();
  
  const tempAccount1 = new Account('Ahmet', 'ahmetkrc@gmail.com', 'pass123');
  const tempAccount2 = new Account('Kunle', 'kunle@gmail.com', 'pass123');
  await accountRepository.writeAccount(tempAccount1);
  await accountRepository.writeAccount(tempAccount2);
  
  //send eachother friend requests = added as friends
  await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  await AccountService.sendFriendRequest('Kunle|kunle@gmail.com', 'Ahmet');
  
  //try to send kunle a friend req from ahmet
  const exit1 = await AccountService.sendFriendRequest('Ahmet|ahmetkrc@gmail.com', 'Kunle');
  expect(exit1).toBe(3);
  
  //try to send ahmet a friend req from kunle
  const exit2 = await AccountService.sendFriendRequest('Kunle|kunle@gmail.com', 'Ahmet');
  expect(exit2).toBe(3);

  //ensure kunle's request list is empty
  const account1 = Account.getInstance('Kunle|kunle@gmail.com', await accountRepository.readAccount('Kunle|kunle@gmail.com'));
  expect(account1.requestList.length).toBe(0);
  expect(account1.requestList[0]).toBe(undefined);

  //ensure ahmet's request list is empty
  const account2 = Account.getInstance('Ahmet|ahmetkrc@gmail.com', await accountRepository.readAccount('Ahmet|ahmetkrc@gmail.com'));
  expect(account2.requestList.length).toBe(0);
  expect(account2.requestList[0]).toBe(undefined);
});

//#endregion