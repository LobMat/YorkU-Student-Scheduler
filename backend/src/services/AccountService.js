const Account = require('../models/Account');
const accountRepository = require('../repositories/accountRepository');

// The following class 'CourseServices.js' contains all business logic related to 'Course Objects'.
class AccountService {    
    static async userExists (username) {
        return await accountRepository.getKeyFromUsername(username) != undefined;
    }
    static async emailExists(email) {
        return await accountRepository.getKeyFromEmail(email) != undefined;
    } 

    static async registerAccount(username, email, password1, password2) {
        let errFlags = ["", "", ""];

        if (await this.userExists(username))    errFlags[0] = "* Username taken";
        if (await this.emailExists(email))      errFlags[1] = "* Email in use";
        if (password1 != password2)             errFlags[2] = "* Password do not match";
        
        if (errFlags.find(err => err.includes("*")))
            return {acc: null, err: errFlags};
        
        const newAccount = new Account(username, email, password1);
        await accountRepository.writeAccount(newAccount)
        return { acc: newAccount, err: errFlags };
    }

    static async login(field, password) {
        let key;
        if      (key = await accountRepository.getKeyFromUsername(field));
        else if (key = await accountRepository.getKeyFromEmail(field));
        else    throw new Error("Login Failed:\nAn account with this username/email could not be found."); 

        const accData = await accountRepository.readAccount(key);
        if (accData.password != password) throw new Error('Login Failed:\nIncorrect password!');
        
        return Account.getAccountFromData(key, accData); 
    }

    static async addFriend(senderName, recieverName) {
        if (!(await this.userExists(recieverName))) throw new Error(`No users found with the username '${recieverName}'.`); 
        
        const key = await accountRepository.getKeyFromUsername(senderName);
        const senderAccount = Account.getAccountFromData(key, await accountRepository.readAccount(key));

        if(senderAccount.getFriend(recieverName)) throw new Error(`Already friends with '${recieverName}'.`);
        senderAccount.addFriend(recieverName);
        
        await accountRepository.writeAccount(senderAccount);
    }

}


module.exports = AccountService;