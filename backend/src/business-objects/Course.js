// var admin = require("firebase-admin");
// var serviceAccount = require("../yorku-scheduler-firebase-adminsdk-fbsvc-b71daa9446.json");
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// const db = admin.firestore();

const Section = require("./Section");

class Course {
  constructor(courseCode, courseTitle, sectionList = []) {
    this.courseCode = courseCode;
    this.courseTitle = courseTitle;
    this.sectionList = sectionList;

    this.reviewList = [];
    this.difficulty = 0;
    this.quality = 0;


    
  }

  addSection(section) {
    this.sectionList.push(Object.assign({}, section));
  }

  getSection(letter) {
    return this.sectionList.find((section) => section.letter == letter);
  }

}


class Enrolments {
  constructor(){
    this.courseCode = courseCode;
    this.section = section;
    this.times = ["M:1:30-3:30", "T:4:30-6:30"];
    
  }
}
module.exports = Course;



