const Database = require('../database/StubDatabase');
const AccountUtils = require('../utils/AccountUtils');

class Account {

  constructor(username, email, password, courseSelectionList = [], friendsList = [], reviewList = []) {
    this.username = username;
    this.email = email;
    this.password = password

    this.courseSelectionList = courseSelectionList;
    this.friendsList = friendsList;
    this.reviewList = reviewList;
  }

  getLiteral() {
    return {
      password:        this.password,
      selections:      this.courseSelectionList,
      friends:         this.friendsList,
      reviews:         this.reviewList,
    }
  }
  static getAccountFromData(key, data) {
    const index = key.indexOf("|");
    return new Account(key.substring(0, index), key.substring(index+1), data.password, data.selections, data.friends, data.reviews);
  }
  addFriend(friendName) {
  
    //console.log(this.friendsList);
    this.friendsList.push(friendName);
  }

  getFriend(friendName) {
    return this.friendsList.find(friend => friend == friendName);
  }

}

module.exports = Account;



// addTime(timeString) {
//   timeString.split("|").forEach((time) => {s
//     let arr = time.split(";");
//     switch (arr[0]) {
//       case("M"): this.times.push(this.name + "on monday from " + arr[1] + " to " + arr[2]); break;
//       case("T"): this.times.push(this.name + "on tuesday from " + arr[1] + " to " + arr[2]); break;
//       case("W"): this.times.push(this.name + "on wednesday from " + arr[1] + " to " + arr[2]); break;
//       case("R"): this.times.push(this.name + "on thursday from " + arr[1] + " to " + arr[2]);  break;
//       case("F"): this.times.push(this.name + "on friday from " + arr[1] + " to " + arr[2]); break;
//     }
//   });
// };