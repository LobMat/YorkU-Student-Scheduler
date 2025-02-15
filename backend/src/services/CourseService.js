const Course = require('../business-objects/Course');
const Database = require('../database/StubDatabase');


class CourseService {
    
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


}
