const Database = require('../database/StubDatabase');
const CourseUtils = require('../utils/CourseUtils');

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
  static getCourseFromData(key, data) {
    return new Course(key, data.title, data.sections, data.reviews, data.difficulty, data.quality);
  }

  findSection(letter) {
    const section = this.sectionList.find((section) => section.letter == letter);
    return (!section) ? null : section;
  }

  addSection(sectionLetter, termLetter, directorName) {
    const newSection = CourseUtils.newSection(sectionLetter, termLetter, directorName)
    this.sectionList.push(newSection);
    return newSection;
  }
}

module.exports = { Course, CourseUtils };



// addTime(timeString) {
//   timeString.split("|").forEach((time) => {
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