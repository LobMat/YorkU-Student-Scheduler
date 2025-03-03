const Course = require('../src/models/Course');
const Account = require('../src/models/Account');
const courseRepository = require('../src/repositories/courseRepository');
const accountRepository = require('../src/repositories/accountRepository');

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
//#endregion
async function writeCourseData() {

  const c1s1 = createSection("X", "W");
  addCommonActivity(c1s1, "LECT01");
  addUniqueActivity(c1s1, "LAB 01");
  const c1s2 = createSection("Z", "W");
  addCommonActivity(c1s2, "LECT01");
  addUniqueActivity(c1s2, "LAB 01");
  courseRepository.writeCourse(new Course("EECS2311", "Software Development Project", [c1s1, c1s2]));

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
}
async function writeAccountData() {

  const a1 = new Account("calebwj", "2005cwj@gmail.com", "caleb123");
  a1.addFriend("ayokunlemi"); 
  const a2 = new Account("ayokunlemi", "kunle@gmail.com", "nigeria");
  a2.addFriend("calebwj");
  const a3 = new Account("ahmet", "ahmet@gmail.com",  "abc");
  const a4 = new Account("mirza", "mirza@gmail.com", "abc123");
  const a5 = new Account("zaynAli", "zayn@gmail.com",  "abc");
  const a6 = new Account("matthew", "mateo@gmail.com", "abc123");

  accountRepository.writeAccount(a1);
  accountRepository.writeAccount(a2);
  accountRepository.writeAccount(a3);
  accountRepository.writeAccount(a4);
  accountRepository.writeAccount(a5);
  accountRepository.writeAccount(a6);
}

module.exports = { writeCourseData, writeAccountData } ; 