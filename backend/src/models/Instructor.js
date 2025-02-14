// var admin = require("firebase-admin");
// var serviceAccount = require("../yorku-scheduler-firebase-adminsdk-fbsvc-b71daa9446.json");
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// const db = admin.firestore();

class Instructor {
  constructor(instructorName) {
    this.instructorName = instructorName;
    this.reviewList = [];
    this.difficulty = 0;
    this.quality = 0;
  }

}

module.exports = Instructor;