class Account {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;

    this.friendList = [];
    this.courseSelections = []; //courses selected with the currently chosen section and that sections activity info.
    

  }
  
}



 
module.exports = Account;  