/* This is for the framework of how accounts work.
 * Each account has 5 fields to store. The username, password, email, courses enrolled in, and friends.
 * Friends is another collection of friend objects, username, email, and password are strings, and enrolements is an array of specified courses (by section).
 */
//const Course = require("./Course"); // for some imlpementation later

class Account {
  // constructor for making an account
  constructor(username, password, email, enrollments, friends) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.enrollments = enrollments;
    this.friends = friends;
  }

  // method for adding a course
  addEnrolledCourse(course) {
    this.enrollments.push(course);
  }

  // method for getting courses
  getEnrolledCourses() {
    return this.enrollments;
  }

  addFriend(friend) {
    this.friends.push(friend);
  }

  getFriendList() {
    return this.friends;
  }

  // method for changing username
  changeUsername(username) {
    this.username = username;
  }

  // method for changing password
  changePassword(password) {
    this.password = password;
  }

  // method for changing email
  changeEmail(email) {
    this.email = email;
  }

  // method for getting password
  getPassword() {
    return this.password;
  }

  // method for getting username
  getUsername() {
    return this.username;
  }

  // method for getting email
  getEmail() {
    return this.email;
  }
}

module.exports = Account;
