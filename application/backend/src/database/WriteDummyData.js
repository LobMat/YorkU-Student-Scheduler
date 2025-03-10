const Course = require('../models/Course');
const Account = require('../models/Account');
const courseRepository = require('../repositories/courseRepository');
const accountRepository = require('../repositories/accountRepository');

// In-memory object to store course times
const courseTimesDB = {};

//#region - course creation helper methods
const createSection = (sectChar, termChar) => {
  return {
    sectChar: sectChar,
    termChar: termChar,
    commonActs: [],
    uniqueActs: [],
  }
}

const addCommonActivity = (section, actName) => section.commonActs.push({actName: actName});
const addUniqueActivity = (section, actName) => section.uniqueActs.push({actName: actName});

// const saveCourseTime = (courseName, timeSlot) => {
//   if (!courseTimesDB[courseName]) {
//       courseTimesDB[courseName] = {};
//   }
//   if (!courseTimesDB[courseName][timeSlot]) {
//       courseTimesDB[courseName][timeSlot] = { timeSlot, frequency: 1 };
//   } else {
//       courseTimesDB[courseName][timeSlot].frequency += 1;
//   }
// };

// const getSuggestedTimes = (courseName) => {
//   if (!courseTimesDB[courseName]) {
//       return [];
//   }
//   return Object.values(courseTimesDB[courseName])
//       .sort((a, b) => b.frequency - a.frequency)
//       .map(entry => entry.timeSlot)
//       .slice(0, 3); // Return top 3 most selected times
// };
//#endregion
async function writeCourseData() {

  const c1s1 = createSection("X", "W");
  addCommonActivity(c1s1, "LECT01");
  addUniqueActivity(c1s1, "LAB 01");
  const c1s2 = createSection("Z", "W");
  addCommonActivity(c1s2, "LECT01");
  addUniqueActivity(c1s2, "LAB 01");
  courseRepository.writeCourse(new Course("EECS2311", "Software Development Project", [c1s1, c1s2]));

  // // Mock user-selected times for EECS2311
  // saveCourseTime("EECS2311", "9:00 AM");
  // saveCourseTime("EECS2311", "12:00 PM");
  // saveCourseTime("EECS2311", "1:30 PM");

  const c2s1 = createSection("E", "F");
  addCommonActivity(c2s1, "LECT01");
  addUniqueActivity(c2s1, "LAB 01");
  addUniqueActivity(c2s1, "LAB 02");
  addUniqueActivity(c2s1, "LAB 03");
  addUniqueActivity(c2s1, "LAB 04");
  addUniqueActivity(c2s1, "LAB 05");
  const c2s2 = createSection("Z", "W");
  addCommonActivity(c2s2, "LECT01");
  addUniqueActivity(c2s2, "LAB 01");
  addUniqueActivity(c2s2, "LAB 02");
  addUniqueActivity(c2s2, "LAB 03");
  addUniqueActivity(c2s2, "LAB 04");
  addUniqueActivity(c2s2, "LAB 05");
  courseRepository.writeCourse(new Course("EECS2200", "Electrical Circuits", [c2s1, c2s2]));
  // // Mock user-selected times for EECS2200
  // saveCourseTime("EECS2200", "9:00 AM");
  // saveCourseTime("EECS2200", "9:00 AM");
  // saveCourseTime("EECS2200", "2:30 PM");

  const c3s1 = createSection("A", "F");
  addCommonActivity(c3s1, "LECT01");
  const c3s2 = createSection("E", "F");
  addCommonActivity(c3s2, "LECT01");
  const c3s3 = createSection("M", "W");
  addCommonActivity(c3s3, "LECT01");
  const c3s4 = createSection("N", "W");
  addCommonActivity(c3s4, "LECT01");
  const c3s5 = createSection("X", "W");
  addCommonActivity(c3s5, "LECT01");
  const c3s6 = createSection("Z", "W");
  addCommonActivity(c3s6, "LECT01");
  courseRepository.writeCourse(new Course("EECS2101", "Fundamentals of Data Structures", [c3s1, c3s2, c3s3, c3s4, c3s5, c3s6]));
  
  // console.log("Suggested Times for EECS2311:", getSuggestedTimes("EECS2311"));
  // console.log("Suggested Times for EECS2200:", getSuggestedTimes("EECS2200"));
}
async function writeAccountData() {
  const a1 = new Account("calebwj", "2005cwj@gmail.com", "caleb123")
  const a2 = new Account("ayokunlemi", "kunle@gmail.com", "nigeria")
  accountRepository.writeAccount(a1);
  accountRepository.writeAccount(a2);
}

//module.exports = { writeCourseData, writeAccountData, getSuggestedTimes} ; 
module.exports = { writeCourseData, writeAccountData, getSuggestedTimes} ;