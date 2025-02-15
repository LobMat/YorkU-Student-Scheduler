

class Account {

  constructor(username, email, password, courseSelectionList = [], friendsList = [], pendingList = [], reviewList = []) {
    this.username = username;
    this.email = email;
    this.password = password

    this.courseSelectionList = courseSelectionList;
    this.friendsList = friendsList;
    this.pendingList =pendingList;
    this.reviewList = reviewList;
    
  }
  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getEnrolledCourses() {
    return this.courseSelectionList;
  }

  getFriendList() {
    return this.friendsList;
  }

  getPendingRequests() {
    return this.pendingList;
  }

  setPassword(newPassword) {
    this.password = newPassword;
  }

  getLiteral() {
    return {
      password:        this.password,
      selections:      this.courseSelectionList,
      friends:         this.friendsList,
      pending:         this.pendingList,
      reviews:         this.reviewList,
    }
  }

  addFriend(friendName) {
    this.friendsList.push(friendName);
  }
  removeFriend(friendName) {
    this.friendsList = this.friendsList.filter(friend => friend == friendName);
  }

  getFriend(friendName) {
    return this.friendsList.find(friend => friend == friendName);
  }

  addPendingRequest(senderName) {
    this.pendingList.push(senderName);
  }
  removePendingRequest(senderName) {
    this.pendinglist = this.pendingList.filter(sender => sender == senderName);
  }

}

class AccountUtils {
  static getFromData(key, data) {
    const index = key.indexOf("|");
    return new Account(key.substring(0, index), key.substring(index+1), data.password, data.selections, data.friends, data.pendings, data.reviews);
  }
}
module.exports = { Account, AccountUtils };