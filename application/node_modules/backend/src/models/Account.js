// This file contains the business object for a user account. 
// It will store related information such as the username, password, email, saved courses, friends, and reviews for this unique account instance.

class Account {

  //#region - Account business object instance contructor

  constructor(username, email, password, coursePreferenceMap={}, friendsList=[], requestList=[], reviewList=[]) {
    // parameters required to create a new account
    this.username = username;
    this.email = email;
    this.password = password;
    
    // not required for creation, only used for updating.
    this.coursePreferenceMap = coursePreferenceMap;
    this.friendsList = friendsList;
    this.requestList = requestList;
    this.reviewList = reviewList;
  }

  //#endregion

  //#region - static methods
  
  // converts a passed in Account instance to its equivalent database-friendly object. 
  static getKeyValue(account) {
    return {
      key: `${account.username}|${account.email}`,
      value: {
        password:       account.password,
        coursePrefs:    account.coursePreferenceMap,
        friends:        account.friendsList,
        requests:       account.requestList,
        reviews:        account.reviewList,
      }
    }
  }

  // converts a key-value pair into an Account instance.
  static getInstance(key, value) {
    const keyFields = key.split('|');
    return new Account(
      keyFields[0],         // username
      keyFields[1],         // email
      value.password,       // password
      value.coursePrefs,    // coursePreferenceMap
      value.friends,        // friendsList
      value.requests,       // requestList
      value.reviews,        // reviewList
    )
  }

  //#endregion

  //#region - instance methods

  // add friend
  addFriend(friendUsername) {
    this.friendsList.push(friendUsername)
  }
  // remove friend
  removeFriend(friendUsername) {
    const friendIndex = this.friendsList.indexOf(friendUsername);
    if (friendIndex > -1) {
      this.friendsList.splice(friendIndex, 1);
    }
  }

  // add friend request
  addRequest(senderUsername) {
    this.requestList.push(senderUsername);
  }
  // remove friend request
  removeRequest(senderUsername) {
    const senderIndex = this.requestList.indexOf(senderUsername);
    if (senderIndex > -1) {
      this.requestList.splice(senderIndex, 1);
    }
  }
  
  // add reference to a review
  addReview(reviewID) {
    this.reviewList.push(reviewID);
  }
  // remove reference to a review
  removeReview(reviewID) {
    const reviewIndex = this.reviewList.indexOf(reviewID);
    if (reviewIndex > -1) {
      this.reviewList.splice(reviewIndex, 1);
    }
  }

  //#endregion

}

module.exports = Account;