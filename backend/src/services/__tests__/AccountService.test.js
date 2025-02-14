const Database = require('../../database/StubDatabase');
const Account = require('../../models/Account');
const { AccountService, AccountRepository } = require('../AccountService');


const createDummyAccounts = () => {
    Database.init();
    const caleb = new Account("calebwj", "2005cwj@gmail.com", "caleb1234");
    const mateo = new Account("mattthews", "mateolobato@gmail.com", "matPass");
    const kunle = new Account("kunle43", "ayokunlemi@yahoo.com", "nigerianBlessings4!");
    const ahmet = new Account("ahmetkrc", "ahmetkrc@outlook.com", "ahmet231");
    AccountRepository.writeAccount(caleb);
    AccountRepository.writeAccount(mateo);
    AccountRepository.writeAccount(kunle);
    AccountRepository.writeAccount(ahmet);
}

//helper method for getting an account from username
async function getAccount(name) {
    const key = await AccountRepository.getKeyFromUsername(name);
    return(Account.getAccountFromData(key, await AccountRepository.readAccount(key)));
}

// Simulate account registration. A user must enter their username, email, and the same password twice. 
test('AccountService.registerAccount() #1', async () => {   

    Database.init();
    await AccountService.registerAccount("calebwj", "2005cwj@gmail.com", "caleb123", "caleb123");

    const key1 = await AccountRepository.getKeyFromUsername("calebwj");
    expect(key1).toBe("calebwj|2005cwj@gmail.com");

    const loadedAccount = Account.getAccountFromData(key1, await AccountRepository.readAccount(key1))
    expect(loadedAccount.username).toBe("calebwj")
    expect(loadedAccount.email).toBe("2005cwj@gmail.com")
    expect(loadedAccount.password).toBe("caleb123")

})

// Test for an error message when registering an account with non-matching passwords.
test('AccountService.registerAccount() #2', async () => {   

    Database.init();
    await expect(AccountService.registerAccount("calebwj", "2005cwj@gmail.com", "caleb123", "caleb1234"))
    .rejects
    .toThrow('Registration Failed:\nPasswords do not match.');
    
    const key1 = await AccountRepository.getKeyFromUsername("calebwj"); 
    expect(key1).toBe(undefined);
    expect(Database.collections.get("accounts").size).toBe(0);


})

// Test for a specific error message when registering an account with a username that exists. Test again with combined error message for that and password error.
test('AccountService.registerAccount() #3', async () => {   
    createDummyAccounts();
    expect(Database.collections.get("accounts").size).toBe(4);
    
    // try to register an account who's username already exists.
    await expect(AccountService.registerAccount("calebwj", "fakeEmail", "caleb123", "caleb123"))
    .rejects
    .toThrow('Registration Failed:\nAn account with this username already exists.');

    // no change in database size, no account was added.
    expect(Database.collections.get("accounts").size).toBe(4);

    //existing account AND passwords do not match
    await expect(AccountService.registerAccount("ahmetkrc", "fakeEmail", "ahmet1", "ahmet2"))
    .rejects
    .toThrow('Registration Failed:\nAn account with this username already exists.\nPasswords do not match.');
    
    // no change in database size, no account was added.
    expect(Database.collections.get("accounts").size).toBe(4);

})

// Test for a specific error message when registering an account with an email that exists. Test again with combined error message for all errors.
test('AccountService.registerAccount() #4', async () => {   

    createDummyAccounts();
    expect(Database.collections.get("accounts").size).toBe(4);
    
    // try to register an account who's email already exists. 
    await expect(AccountService.registerAccount("newName", "2005cwj@gmail.com", "caleb123", "caleb123"))
        .rejects.toThrow('Registration Failed:\nAn account with this email already exists.');
    expect(Database.collections.get("accounts").size).toBe(4);

    // try to register an account who's email already exists and passwords do not match.
    await expect(AccountService.registerAccount("newName", "2005cwj@gmail.com", "caleb123", "caleb1234"))
        .rejects.toThrow('Registration Failed:\nAn account with this email already exists.\nPasswords do not match.');
    expect(Database.collections.get("accounts").size).toBe(4);

    // try to register an account who's email already exists, username exists, and passwords do not match.
    await expect(AccountService.registerAccount("kunle43", "ahmetkrc@outlook.com", "caleb123", "caleb1234"))
        .rejects.toThrow('Registration Failed:\nAn account with this username already exists.\nAn account with this email already exists.\nPasswords do not match.');
    expect(Database.collections.get("accounts").size).toBe(4);
   


})

// Simulate login process with username. A user must enter their username OR email, and the password. Logging in returns an account object with the user's info.
test('AccountService.login() #1', async () => {   
    createDummyAccounts();
    // get accounts by logging in with username, and ensure the returned account has the matching email.
    const caleb = await AccountService.login("calebwj", "caleb1234");
    expect(caleb.email).toBe("2005cwj@gmail.com");

    const mateo = await AccountService.login("mattthews", "matPass");
    expect(mateo.email).toBe("mateolobato@gmail.com");
})

// Simulate login process with email.
test('AccountService.login() #2', async () => {   
    createDummyAccounts();
    const caleb = await AccountService.login("2005cwj@gmail.com", "caleb1234");
    expect(caleb.username).toBe("calebwj");

    const mateo = await AccountService.login("mateolobato@gmail.com", "matPass");
    expect(mateo.username).toBe("mattthews");
})

// Simulate login process to an account that doesn't exist. 
test('AccountService.login() #3', async () => {   
    createDummyAccounts();
    //username doesnt exist
    await expect(AccountService.login("zaynAli", "passwordDoesntMatter"))
        .rejects.toThrow('Login Failed:\nAn account with this username/email could not be found.');
    //email doesnt exist
    await expect(AccountService.login("zaynAli@gmail.com", "passwordDoesntMatter"))
        .rejects.toThrow('Login Failed:\nAn account with this username/email could not be found.');
})

// Simulate login process with wrong password.
test('AccountService.login() #4', async () => {  
    createDummyAccounts(); 
    //username doesnt exist
    await expect(AccountService.login("calebwj", "badPassword"))
        .rejects.toThrow('Login Failed:\nIncorrect password!');
    //email doesnt exist
    await expect(AccountService.login("2005cwj@gmail.com", "badPassword"))
        .rejects.toThrow('Login Failed:\nIncorrect password!');
})

// Simulate adding a friend. The account this is called by adds the target to their friends list.
test('AccountService.addFriend() #1', async () => {
    createDummyAccounts();

    let caleb, kunle;

    caleb = await getAccount("calebwj");
    kunle = await getAccount("kunle43");
    expect(caleb.friendsList.length).toBe(0);
    expect(kunle.friendsList.length).toBe(0);
    
    //user 'calebwj' adds 'kunle43' to his friends list.
    await AccountService.addFriend("calebwj", "kunle43");
    caleb = await getAccount("calebwj"); 
    kunle = await getAccount("kunle43");
    expect(caleb.friendsList.length).toBe(1);
    expect(kunle.friendsList.length).toBe(0);
    expect(caleb.friendsList[0]).toBe("kunle43");
    expect(kunle.friendsList[0]).toBe(undefined);

    //user 'kunle43' adds 'calebwj' to his friends list.
    await AccountService.addFriend("kunle43", "calebwj");
    caleb = await getAccount("calebwj"); 
    kunle = await getAccount("kunle43");
    expect(caleb.friendsList.length).toBe(1);
    expect(kunle.friendsList.length).toBe(1);
    expect(caleb.friendsList[0]).toBe("kunle43");
    expect(kunle.friendsList[0]).toBe("calebwj");

    //user 'calebwj' adds a second friend.
    await AccountService.addFriend("calebwj", "ahmetkrc");
    caleb = await getAccount("calebwj"); 
    expect(caleb.friendsList.length).toBe(2);
    expect(caleb.friendsList[0]).toBe("kunle43");
    expect(caleb.friendsList[1]).toBe("ahmetkrc");

})

// Attempt to add a friend with a username that does not exist.
test('AccountService.addFriend() #2', async () => {

    createDummyAccounts();

    let caleb = await getAccount("calebwj");
    expect(caleb.friendsList.length).toBe(0);
    expect(caleb.friendsList[0]).toBe(undefined);

    //user 'calebwj' tries to add non-existent user 'zaynAli' to his friends list.
    await expect(AccountService.addFriend("calebwj", "zaynAli"))
        .rejects.toThrow("No users found with the username 'zaynAli'.");
    caleb = await getAccount("calebwj");
    expect(caleb.friendsList.length).toBe(0);
    expect(caleb.friendsList[0]).toBe(undefined);

})

// Attempt to add a friend you have already added before.
test('AccountService.addFriend() #3', async () => {    

   

    //user 'calebwj' tries adds user 'ahmetkrc' to his friends list.
    createDummyAccounts();
    await AccountService.addFriend("calebwj", "ahmetkrc");
    let caleb = await getAccount("calebwj");
    expect(caleb.friendsList.length).toBe(1);
    expect(caleb.friendsList[0]).toBe("ahmetkrc");

    //user 'calebwj' tries to add user 'ahmetkrc' to his friends list again.
    await expect(AccountService.addFriend("calebwj", "ahmetkrc"))
        .rejects.toThrow("Already friends with 'ahmetkrc'.");
    caleb = await getAccount("calebwj");
    expect(caleb.friendsList.length).toBe(1);
    expect(caleb.friendsList[0]).toBe("ahmetkrc");

})
