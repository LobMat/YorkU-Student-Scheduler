// 😤 I need to actually write something that CHANGES the data in an account username instead of accidentally making a new one (specifically problem for username; maybe make user IDs)

// Make new account methods, and rework the way stuff is to look more like a bunch of static methods. update console tester accordingly.

//const Course = require("./Course"); // for some imlpementation later

class Account {
  // constructor for making an account
  constructor(username, password, email, enrolements, friends) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.enrolements = enrolements;
    this.friends = friends;
  }

  // method for adding a course
  addEnroledCourse(course) {
    this.enrolements.push(course);
  }

  // method for getting courses
  getCourses() {
    return this.enrolements;
  }

  // method for changing username
  changeUsername(username) {
    this.username = username;
  }

  // method for changing password
  changePassword(password) {
    this.password = password;
  }

  // method for getting password
  getPassword() {
    return this.password;
  }

  // method for getting username
  getUsername() {
    return this.username;
  }
}

module.exports = Account;
