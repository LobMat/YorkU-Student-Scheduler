const { Course } = require('../business-objects/Course');

const Database = require('../database/StubDatabase');

const sectionBuilder = (sectionLetter, termLetter, instructorName) => ({
    sect:           sectionLetter,
    term:           termLetter,
    inst:           instructorName, 
    subsects:       [],
    commonActs:     [], 
  });

const activityBuilder = (activityName, catalogueNumber = "") => ({
    name:           activityName,
    cata:           catalogueNumber,
    times:          [],
})

class CourseService {
    
    //write a course business object to the database. can be called in two ways:  
    static async writeNewCourse(courseCode, courseTitle) {
        if (this.getCourse(code)) return null; //throw error
        return this.writeCourse(new Course(courseCode, courseTitle));
    }

    static async writeCourse(course) {
        const key = course.courseCode;          // unique identifier          [course code]
        const val = course.getLiteral();        // fields matching identifier [object literal with course info]
        Database.create("courses", key, val);   // write the pair to the 'courses' collection
        return course;
    }

    //get a course business object from the database based on it's course code.
    static async getCourse(courseCode) {
        const data = Database.read("course", courseCode)
        if (!data) {
            return null //throw error, course does not exist.
        } else {
            return new Course(courseCode, data.title, data.sections, data.reviews, data.difficulty, data.quality);  
        }
    }

    static async getSection(courseCode, sectionLetter) {
        const course = getCourse(courseCode);
        if (!course) return null;
        
        const sectionData = course.sectionList.find((section) => section.sect == sectionLetter);
        if (!sectionData) return null; //throw error
        
        return sectionData;
    }

    static async getSubsection(courseCode, sectionLetter, catalogueNumber) {
        const section = getSection(courseCode, sectionLetter);
        if (!section) return null;
        
        const subsectionData = section.subsects.find((subsect) => subsect.catNum == catalogueNumber);
        if (!subsectionData) return null;
        
        return subsectionData;
    }

    static async delete(courseCode) {
        Database.delete("accounts", courseCode);
    }

    static async addSectionToCourse(courseCode, sectionLetter, termLetter, instructorName) {
        const course = getCourse(courseCode);
        const newSection = sectionBuilder(sectionLetter, termLetter, instructorName);
        course.sectionList.push(newSection)
        writeCourse(course)
    }

    static async addActivityToSection(courseCode, sectionLetter, activityName, catalogueNumber = "") {
        const section = getSection(courseCode, sectionLetter);
        const newActivity = activityBuilder(activityName, catalogueNumber);
        ((catalogueNumber != "") ? section.subsects : section.commonActs).push(newActivity)
    }

}
module.exports = CourseService;