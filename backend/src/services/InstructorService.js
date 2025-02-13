const Course = require('../business-objects/Instructor');
const Database = require('../database/StubDatabase');


class CourseService {

    static async create(instructor) {
        let key = instructor.instructorName;
        let fields = {
            reviews: [],
            difficulty: 0,
            quality: 0
        } 
        Database.create("instructors", key, fields);
    }

    static async read(instructorName) {
        let data = Database.getData("instructors", instructorName)
        if (!data) return null //throw an error

        //deconstruct
        let { reviewList, difficulty, quality } = data ;
        
        //return course object
        return new Instructor(reviewList, difficulty, quality);  
    }

    static async delete(instructorName) {
        Database.delete("instructors", instructorName);
    }

    
}