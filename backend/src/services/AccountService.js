
const Account = require('../business-objects/Account');
const Database = require('../database/StubDatabase');


class AccountService {
    
    static async create(course) {
        let key = course.courseCode;
        let fields = {
            title: course.courseTitle,  
            sections: course.sectionList, 
            reviews: [],
            difficulty: 0,
            quality: 0
        } 
        Database.create("accounts", key, fields);
    }

    static async read(courseCode) {
        let data = Database.read("accounts", courseCode)
        if (!data) return null 
        let { courseTitle, sectionList, reviewList, difficulty, quality } = data ;
        return new Course(courseCode, courseTitle, sectionList, reviewList, difficulty, quality);  
    }

    static async delete(courseCode) {
        Database.delete("accounts", courseCode);
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