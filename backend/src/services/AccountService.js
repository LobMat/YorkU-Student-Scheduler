const Account = require('../models/Account');
const AccountUtils = require('../utils/AccountUtils');
const Database = require('../database/StubDatabase');

class AccountRepository {
    static async writeAccount(account) {
        await Database.write("accounts", `${account.username}|${account.email}`, account.getLiteral());
        
    }

    static async readAccount(key) {
        return await Database.read("accounts", key);
    }
    
    static async getKeyFromUsername(username) {
        const allkeys = Array.from(await Database.readAllKeys("accounts"))
        return (allkeys.filter(key => key.startsWith(`${username}|`)))[0];
    }

    static async getKeyFromEmail(email) {
        const allkeys = Array.from(await Database.readAllKeys("accounts"))
        return (allkeys.filter(key => key.endsWith(`|${email}`)))[0];
    }

}

// The following class 'CourseServices.js' contains all business logic related to 'Course Objects'.
class AccountService {    
    
    static async userExists (username) {
        return await AccountRepository.getKeyFromUsername(username) != undefined;
    }
    static async emailExists(email) {
        return await AccountRepository.getKeyFromEmail(email) != undefined;
    } 

    static async registerAccount(username, email, password1, password2) {
        let errFlags = [0, 0, 0];

        if (await this.userExists(username))    errFlags[0] = 1;
        if (await this.emailExists(email))      errFlags[1] = 1;
        if (password1 != password2)             errFlags[2] = 1;

        // if (errFlags.includes(1)) {
        //     let errorMessage = "Registration Failed:\n";
        //     if (errFlags[0]) errorMessage += "An account with this username already exists.\n";
        //     if (errFlags[1])errorMessage += "An account with this email already exists.\n";
        //     if (errFlags[2])errorMessage += "Passwords do not match.\n";
        //     errorMessage = errorMessage.substring(0, errorMessage.length-1);
        //     throw new Error(errorMessage);
        // }
        
        
        if (errFlags.includes(1))
            return {acc: null, err: errFlags};
        
        const newAccount = new Account(username, email, password1);
        await AccountRepository.writeAccount(newAccount)
        return { acc: newAccount, err: null };
    }

    static async login(field, password) {
        let key;
        if      (key = await AccountRepository.getKeyFromUsername(field));
        else if (key = await AccountRepository.getKeyFromEmail(field));
        else    throw new Error("Login Failed:\nAn account with this username/email could not be found."); 

        const accData = await AccountRepository.readAccount(key);
        if (accData.password != password) throw new Error('Login Failed:\nIncorrect password!');
        
        return Account.getAccountFromData(key, accData); 
    }

    static async addFriend(senderName, recieverName) {
        if (!(await this.userExists(recieverName))) throw new Error(`No users found with the username '${recieverName}'.`); 
        
        const key = await AccountRepository.getKeyFromUsername(senderName);
        const senderAccount = Account.getAccountFromData(key, await AccountRepository.readAccount(key));

        if(senderAccount.getFriend(recieverName)) throw new Error(`Already friends with '${recieverName}'.`);
        senderAccount.addFriend(recieverName);
        
        await AccountRepository.writeAccount(senderAccount);
    }

}


module.exports = { AccountService, AccountRepository};