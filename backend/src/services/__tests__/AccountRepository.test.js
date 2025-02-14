const Database = require('../../database/StubDatabase');
const Account = require('../../models/Account');
const { AccountService, AccountRepository } = require('../AccountService');

var userCollection;

const createDummyAccounts = () => {
    Database.init();
    userCollection = Database.collections.get("accounts");
    const caleb = new Account("calebwj", "2005cwj@gmail.com", "caleb1234");
    const mateo = new Account("mattthews", "mateolobato@gmail.com", "matPass");
    const kunle = new Account("kunle43", "ayokunlemi@yahoo.com", "nigerianBlessings4!");
    const ahmet = new Account("ahmetkrc", "ahmetkrc@outlook.com", "ahmet231");
    AccountRepository.writeAccount(caleb);
    AccountRepository.writeAccount(mateo);
    AccountRepository.writeAccount(kunle);
    AccountRepository.writeAccount(ahmet);
}

//Create and write `Account` business objects to the database through the repository layer.
test('AccountRepository.writeAccount() #1', () => {   
    Database.init();
    userCollection = Database.collections.get("accounts");
    expect(userCollection.size).toBe(0);

    const caleb = new Account("calebwj", "2005cwj@gmail.com", "caleb1234");
    const mateo = new Account("mattthews", "mateolobato@gmail.com", "mateopassword");
    const kunle = new Account("kunle43", "ayokunlemi@yahoo.com", "nigerianBlessings4!");

    AccountRepository.writeAccount(caleb);
    expect(userCollection.size).toBe(1);
    expect(userCollection.get("calebwj|2005cwj@gmail.com").password).toBe("caleb1234");

    AccountRepository.writeAccount(mateo);
    expect(userCollection.size).toBe(2);
    expect(userCollection.get("calebwj|2005cwj@gmail.com").password).toBe("caleb1234");
    expect(userCollection.get("mattthews|mateolobato@gmail.com").password).toBe("mateopassword");

    AccountRepository.writeAccount(kunle);
    expect(userCollection.size).toBe(3);
    expect(userCollection.get("calebwj|2005cwj@gmail.com").password).toBe("caleb1234");
    expect(userCollection.get("mattthews|mateolobato@gmail.com").password).toBe("mateopassword");
    expect(userCollection.get("kunle43|ayokunlemi@yahoo.com").password).toBe("nigerianBlessings4!");

})

//Overwrite an `Account` business object that already exists in the database.
test('AccountRepository.writeAccount() #2', () => {
    Database.init();
    userCollection = Database.collections.get("accounts");
    
    const caleb = new Account("calebwj", "2005cwj@gmail.com", "caleb1234");
    const mateo = new Account("mattthews", "mateolobato@gmail.com", "matPass");

    AccountRepository.writeAccount(caleb);
    AccountRepository.writeAccount(mateo);
    expect(userCollection.get("calebwj|2005cwj@gmail.com").password).toBe("caleb1234");

    mateo.password = "matPass2"
    AccountRepository.writeAccount(mateo);
    expect(userCollection.size).toBe(2);
    expect(userCollection.get("calebwj|2005cwj@gmail.com").password).toBe("caleb1234");
    expect(userCollection.get("mattthews|mateolobato@gmail.com").password).toBe("matPass2");

    caleb.password = "caleb4";
    AccountRepository.writeAccount(caleb);
    expect(userCollection.size).toBe(2);
    expect(userCollection.get("calebwj|2005cwj@gmail.com").password).toBe("caleb4");
    expect(userCollection.get("mattthews|mateolobato@gmail.com").password).toBe("matPass2");
})

//Get raw data from the database pertaining to an `Account` business object.
test('AccountRepository.readAccount() #1', async () => {
    createDummyAccounts();

    let data1 = await AccountRepository.readAccount("calebwj|2005cwj@gmail.com");
    expect(data1.password).toBe("caleb1234");

    data1 = await AccountRepository.readAccount("mattthews|mateolobato@gmail.com");
    expect(data1.password).toBe("matPass");

})

// Convert raw data into an `Account` business object using Account helper method. Use this object to make changes to fields, and reflect them in database.
test('Account.getAccountFromData() #1', async () => {
    createDummyAccounts();

    // load an account into an object and change the password in the object.
    const key = "calebwj|2005cwj@gmail.com";
    const firstLoadData = await AccountRepository.readAccount(key);
    const firstLoadAcc = Account.getAccountFromData(key, firstLoadData);
    firstLoadAcc.password = "abcdefg";
    console.log(`${firstLoadAcc.username}|${firstLoadAcc.email}`)
    // load account again, password should not have changed. because we did not write to database
    const secondLoadAcc = Account.getAccountFromData(key, await AccountRepository.readAccount(key));
    expect(secondLoadAcc.password).not.toBe("abcdefg"); 
    
    
    // write changes, read from repository and test that changes are reflected.
    await AccountRepository.writeAccount(firstLoadAcc);
    
    const thirdLoadAcc = Account.getAccountFromData(key, await AccountRepository.readAccount(key));
    expect(thirdLoadAcc.password).toBe("abcdefg");   
})

// test that the function 'getKeyFromUsername' takes in a username and finds the whole key that matches the username, containing the email as well.
test('AccountRepository.getKeyFromUsername() #1', async() => {
    createDummyAccounts();

    // test that key is generated properly from username
    const calebKey = await AccountRepository.getKeyFromUsername("calebwj");
    expect(calebKey).toBe("calebwj|2005cwj@gmail.com");
    
    // use the key to get data
    const firstLoadAcc = Account.getAccountFromData(calebKey, await AccountRepository.readAccount(calebKey));
    expect(firstLoadAcc.password).toBe("caleb1234");

    // call the function with a username that doesnt exist.
    const fakeKey = await AccountRepository.getKeyFromUsername("zaynAli");
    expect(fakeKey).toBe(undefined);
    
})

// test that the function 'getKeyFromUsername' takes in a email and finds the whole key that matches the email, containing the username as well.
test('AccountRepository.getKeyFromEmail() #1', async() => {
    createDummyAccounts();

    // test that key is generated properly from username
    const calebKey = await AccountRepository.getKeyFromEmail("2005cwj@gmail.com");
    expect(calebKey).toBe("calebwj|2005cwj@gmail.com");
    
    // use the key to get data
    const firstLoadAcc = Account.getAccountFromData(calebKey, await AccountRepository.readAccount(calebKey));
    expect(firstLoadAcc.password).toBe("caleb1234");

    // call the function with a username that doesnt exist.
    const fakeKey = await AccountRepository.getKeyFromEmail("zaynAli");
    expect(fakeKey).toBe(undefined);
    
})