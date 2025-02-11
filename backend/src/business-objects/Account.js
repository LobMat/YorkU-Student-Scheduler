// 😤 I need to actually write something that CHANGES the data in an account username instead of accidentally making a new one (specifically problem for username; maybe make user IDs)

var admin = require("firebase-admin");
var serviceAccount = require("../yorku-scheduler-firebase-adminsdk-fbsvc-2d61a64dfc.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();
//const Course = require("./Course"); // for some imlpementation later

class Account {
  // constructor for making an account
  constructor(username, password, newAccountFlag) {
    // there's a new account flag incase we're making a new account or retrieving an existing one
    if (newAccountFlag == true) {
      this.makeNewAccount(username, password);
    } else {
      this.fetchAccountData(username, password);
    }
  }

  // this function just creates a new account with the info entered and saves it to the DB
  makeNewAccount(username, password) {
    this.username = username;
    this.password = password;
    this.courses = [];
    this.saveToDB();
  }

  async fetchAccountData(username, password) {
    try {
      const accountRef = db.collection("accounts").doc(username);
      const accountSnap = await accountRef.get();
      if (accountSnap.exists) {
        const accountData = accountSnap.data();
        const match = await this.verifyAccount(accountData.password, password);
        if (match) {
          this.username = username;
          this.password = accountData.password;
          this.courses = accountData.courses;
          console.log("User Data:", accountSnap.data());
        } else {
          console.log("Password Incorrect!");
        }
      } else {
        console.log("No such user found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async verifyAccount(passwordInDB, password) {
    return passwordInDB && password; // I am aware this is weak but I will look into more stable implementation later
  }

  async saveToDB() {
    const accountRef = db.collection("accounts").doc(this.username);
    await accountRef.set({
      username: this.username,
      password: this.password,
      courses: this.courses,
    });
    console.log("Account Written");
  }

  // method for adding a course
  set addCourse(course) {
    this.courses.push(Object.assign({}, course));
  }

  // method for getting courses
  get getCourses() {
    return this.courses;
  }

  // method for changing username
  set changeUsername(username) {
    this.username = username;
  }

  // method for changing password
  set changePassword(password) {
    this.password = password;
  }

  // method for getting password
  get getPassword() {
    return this.password;
  }

  // method for getting username
  get getUsername() {
    return this.username;
  }
}

module.exports = Account;
