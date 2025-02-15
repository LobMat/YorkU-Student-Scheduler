// AccountService.js -- Service & Repository layers of Service business objects are both in this file in separate classes.
// Unit testing for this class involves testing business logic in the service layer (communication between objects) as well as reading and writing through the repository layer.

// Dependencies
const Database = require('../data/StubDatabase');             // database
const { Account, AccountUtils } = require("../../src/models/Account");           // account model


// AccountRepository : layer between the database and service layer for any models who need to interact with Account business objects.
class AccountRepository {
  // Write an Account object's data to the database.
    static async writeAccount(account) {
        await Database.write("accounts", `${account.username}|${account.email}`, account.getLiteral());
    }
    
    // Given a key, get the data for an Account in the database.
    static async readAccount(key) {
      return await Database.read("accounts", key);
    }

    //given a username OR email, get matching key
    static async getKey(field) {
      const allkeys = Array.from(await Database.readAllKeys("accounts"))
      return (allkeys.filter(key => key.startsWith(`${field}|`)))[0] || (allkeys.filter(key => key.endsWith(`|${field}`)))[0];
    }
    
}

// The following class 'AccountServices.js' contains all business logic related to 'Account' Business Objects'.
class AccountService {    
    

/* business logic related to user story == create an account to save user information between sessions and fetch information by logging in  */


  // Given a username, email, and a password entered twice, create a new Account object in the database with this information as long as no other user has the same email or username, 
  // and the passwords match. return the model of the created account.
    static async registerAccount(username, email, password1, password2) {
        let errFlags = [0, 0, 0];

        if (await AccountRepository.getKey(username))        errFlags[0] = 1;
        if (await AccountRepository.getKey(email))           errFlags[1] = 1;
        if (password1 != password2)                          errFlags[2] = 1;

        if (errFlags.includes(1)) {
            let errorMessage = "Registration Failed:\n";
            if (errFlags[0]) errorMessage += "An account with this username already exists.\n";
            if (errFlags[1])errorMessage += "An account with this email already exists.\n";
            if (errFlags[2])errorMessage += "Passwords do not match.\n";
            errorMessage = errorMessage.substring(0, errorMessage.length-1);
            throw new Error(errorMessage);
        }
        
        const newAccount = new Account(username, email, password1);
        await AccountRepository.writeAccount(newAccount)
        return newAccount;
    }

  // Given either a username or email and a password, get the database data for the matching account as long as username OR email exists and the password entered matches that field
  // and the passwords match. return the model of the created account.
    static async login(field, password) {
        let key = await AccountRepository.getKey(field); 

        if (!key)
          throw new Error("Login Failed:\nAn account with this username/email could not be found."); 
        const accData = await AccountRepository.readAccount(key)  // no match could be found,
          //throw an error.
          
        if (accData.password != password) 
          throw new Error('Login Failed:\nIncorrect password!'); // incorrect password, throw error.
        
        return AccountUtils.getFromData(key, accData);          // return account object.          
    }




/* business logic related to user story -- "Allow users to be able to connect with their friends. Keep a record of this in the account" */


    // Given the username of an account (person sending request) and the username of another account (person recieving request), try to send a friend request to the reciever. 
    static async sendFriendRequest(senderUsername, receiverUsername) {
      
      const senderKey = AccountRepository.getKey(senderUsername);
      if (!senderKey) 
        throw new Error ("Invalid call!");
      const senderData = await AccountRepository.readAccount(senderKey);
      const sender = AccountUtils.getFromData(senderKey, senderData);
      
      const receiverKey = AccountRepository.getKey(receiverUsername);
      if (!receiverKey)
        throw new Error("The user you are trying to add does not exist.");
      const receiverData = await AccountRepository.readAccount(receiverKey);
      const receiver = AccountUtils.getFromData(receiverKey, receiverData);

      if (receiver.friendsList && receiver.friendsList.includes(senderUsername))
        throw new Error(`${receiverUsername} is already your friend.`);
      
      if (receiver.pendingList && receiver.pendingList.includes(senderUsername))
        throw new Error("Friend request already sent.");
      
      // send a friend request to someone who has sent you a friend request, add eachother as friends.
      if (sender.pendingList.includes(receiver)) {
        
        sender.addFriend(receiverUsername);
        sender.removeRequest(receiverUsername);
        await AccountRepository.write(sender);
        
        receiver.addFriend(senderUsername);
        await AccountRepository.write(receiver);
        
      } else {
        receiver.addPendingRequest(senderUsername);
        await AccountRepository.write(receiver);
      }
    }

    // Given the username of the account (person accepting the request), and the username of the source of the request, add eachother too the friends lists.
      static async acceptFriendRequest(receiverUsername, senderUsername) {
        const receiverKey = AccountRepository.getKey(receiverUsername);
        if (!receiverKey) 
          throw new Error ("Invalid call!");
        const receiverData = await AccountRepository.readAccount(receiverKey);
        const receiver = AccountUtils.getFromData(receiverKey, receiverData);
        
        const senderKey = AccountRepository.getKey(senderUsername);
        if (!senderKey)
          throw new Error("The user who sent this request cannot be found.");
        const senderData = await AccountRepository.readAccount(senderKey);
        const sender = AccountUtils.getFromData(senderKey, senderData);

        if (!receiver.pendingList || !receiver.pendingList.includes(senderUsername))
          throw new Error(`${senderUsername} has not sent a friend request.`);
  
        if (receiver.friends.includes(senderUsername))
          throw new Error(`${receiverUsername} is already your friend.`);

          // Add each other as friends
          sender.addFriend(receiverUsername);
          receiver.addFriend(senderUsername)
          
          // Remove the friend request from pendingRequests
          receiver.removePendingRequest(senderUsername)
      
          // Save the updated accounts back to the database
          await AccountRepository.write(sender);
          await AccountRepository.write(receiver);
          
        }

      

}


module.exports = { AccountService, AccountRepository};