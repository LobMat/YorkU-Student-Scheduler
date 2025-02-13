// var admin = require("firebase-admin");
// var serviceAccount = require("../yorku-scheduler-firebase-adminsdk-fbsvc-b71daa9446.json");
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// const db = admin.firestore();

class Course {
  constructor(courseCode, courseTitle, sectionList = [], reviewList = [], difficulty = 0, quality = 0) {
    this.courseCode = courseCode;
    this.courseTitle = courseTitle;

    this.sectionList = sectionList;
    this.reviewList = reviewList;

    this.difficulty = difficulty;
    this.quality = quality;
  }

  getLiteral() {
    return {
      title:        this.courseTitle,
      sections:     this.sections,
      reviews:      this.reviewList,
      difficulty:   this.difficulty,
      quality:      this.quality
    }
  }


  addSection(newSection) {
    this.sectionList.forEach((section) => {
      if (section.letter == newSection.letter) {
        throw new Error("ERROR: Section with this letter already exists in this course.");
      }
    });
    this.sectionList.push(Object.assign({}, newSection));
  }

  getSection(letter) {
    return this.sectionList.find((section) => section.letter == letter);
  }

}

class Section {
  constructor(letter, term, instructor) {
    this.letter = letter;
    this.term = term;
    this.instructor = instructor,
    this.activities = [];
  }

  addActivity(newActivity){ 
    this.activities.forEach((activity) => {
      if (activity.name == newActivity.name) {
        throw new Error("ERROR: Activity with this name already exists in this section.");
      } else if (activity.cat == newActivity.cat) {
        throw new Error("ERROR: Activity with this catalogue already exists in this section.");
      }
    });
    this.activities.push(Object.assign({}, newActivity));
  }
}

class Activity {
  constructor(name, cat = "") {
    this.name = name;
    this.cat = cat;
    this.times = [];
  }

  addTime(timeString) {
    timeString.split("|").forEach((time) => {
      let arr = time.split(";");
      switch (arr[0]) {
        case("M"): this.times.push(this.name + "on monday from " + arr[1] + " to " + arr[2]); break;
        case("T"): this.times.push(this.name + "on tuesday from " + arr[1] + " to " + arr[2]); break;
        case("W"): this.times.push(this.name + "on wednesday from " + arr[1] + " to " + arr[2]); break;
        case("R"): this.times.push(this.name + "on thursday from " + arr[1] + " to " + arr[2]);  break;
        case("F"): this.times.push(this.name + "on friday from " + arr[1] + " to " + arr[2]); break;
      }
    });
  }

}
module.exports = {Course, Section, Activity};



