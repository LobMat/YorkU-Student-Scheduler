// 😤 I need to actually write something that CHANGES the data in an account username instead of accidentally making a new one (specifically problem for username; maybe make user IDs)

// Make new account methods, and rework the way stuff is to look more like a bunch of static methods. update console tester accordingly.

//const Course = require("./Course"); // for some imlpementation later

//import StubDatabase from "../database/StubDatabase";

class Account {
  // constructor for making an account
  constructor(username, password, courses) {
    this.username = username;
    this.password = password;
    this.courses = courses;
  }

  // this function just creates a new account with the info entered and saves it to the DB
  static makeNewAccount(username, password, database) {
    if (database.getAccountByUsername(username) == undefined) {
      let courses = [];
      return new Account(username, password, courses);
    } else {
      console.log("An Account with that username already exists.");
    }
  }

  static login(username, password, database) {
    if (database.getAccountByUsername(username) != undefined) {
      const accountData = database.getAccountByUsername(username);
      if (accountData.password == password) {
        return new Account(username, password, accountData.courses);
      } else {
        console.log("Password Incorrect!");
      }
    } else {
      console.log("No such user found!");
    }
  }
}

// method for adding a course
function addCourse(course) {
  this.courses.push(course);
}

// method for getting courses
function getCourses() {
  return this.courses;
}

// method for changing username
function changeUsername(username) {
  this.username = username;
}

// method for changing password
function changePassword(password) {
  this.password = password;
}

// method for getting password
function getPassword() {
  return this.password;
}

// method for getting username
function getUsername() {
  return this.username;
}

module.exports = Account;
