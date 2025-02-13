
const Account = require('../business-objects/Account');
const CourseService = require('./CourseSerivce');

const Database = require('../database/StubDatabase');


class AccountService {
    
    
    static async writeAccount(account){
        let key = account.username;
        let fields = {
            email:                  account.email,  
            password:               account.password, 
            friendList:             account.friendList.slice(),
            courseSelectionList:    account.courseSelections.slice(),
            reviewList:             account.reviews.slice()
        } 
        Database.write("accounts", key, fields);
    }

    static async getAccount(username) {
        let data = Database.read("accounts", courseCode)
        if (!data) return null //throw error
        let { courseTitle, sectionList, reviewList, difficulty, quality } = data ;
        return new Course(courseCode, courseTitle, sectionList, reviewList, difficulty, quality);  
    }

    static async delete(courseCode) {
        Database.delete("accounts", courseCode);
    
    }

    addCourseSelection(username, courseCode) {

        let account = getAccount(username);
        if (!account) return null; //throw error, user doesnt exist. invalid call

        let userCurrentCourseSelections = account.courseSelections;
        if (userCurrentCourseSelections.find((course) => course.courseCode == courseCode)) return null; //throw error, cant add duplicate course. 

        let courseData = CourseService.getCourse(courseCode);
        if(!courseData) return null; //throw error, course DNE

        let courseSelection = {
            courseCode:         courseCode,
            chosenSection:      courseData.sectionList[0].letter,
            chosenSubsection:   courseData.sectionList[0].subsections[0].catNum,
            times:              [],
        }

        account.courseSelections.push(courseSelection);
        writeAccount(account);
    }

    setCourseSelectionSection(username, targetCourseCode, targetSectionLetter) {
        let account = getAccount(username);
        if (!account) return null; //throw error, user doesnt exist. invalid call

        let targetCourseSelection = account.courseSelections.find((course) => course.courseCode == targetCourseCode);
        if (!targetCourseSelection) return null; //throw error, course doesnt exist. invalid call

        const targetSectionData = CourseService.getSection(targetCourseCode, targetSectionLetter);
        if (!targetSectionData) return null; //throw error, section DNE

        targetCourseSelection.chosenSection = targetSectionLetter;
        targetCourseSelection.chosenSubsection = targetSectionData.subsections[0];
      
        writeAccount(account);
    }

    setCourseSelectionSubsection(username, courseCode, subsectionChoiceId) {

        
    }

    setActivityTimes(username, courseCode, timeMap) {

    }









    














    static async createSelection(courseCode, sectionOfChoice) {

    // 1. get course data 
        
        let data = Database.read("courses", courseCode) 
        if (!data) return null 

    // 2: get the section of interest specifically
        let section = data.sections.find((sect) => sect.letter == sectionOfChoice);
        if (!section) return null  // section does not exist.

        let letter = section.letter;
        let instructor = section.instructor;

        let slots = [];
        let activities = section.allActivityNames();
        activities.forEach((activity) => {
            slots[slots.length] = { activityName: activity, activityTimes: [] }.prototype;
        });

        return {course, letter, instructor, timeslots}
    }

}
module.exports = AccountService;