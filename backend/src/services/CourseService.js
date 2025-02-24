const Course = require('../models/Course');
const courseRepository = require('../repositories/courseRepository');
const CourseUtils = require('../utils/CourseUtils');

// The following class 'CourseService.js' contains all business logic related to 'Course Objects'.
class CourseService {    
    
    // load data relevant to ui from a list of course selections and preferences for those courses.
    static async initialLoad(coursePrefList) {
        const courseUIContainer = [];
        const activityUIContainer = {};
        
        for (const [courseCode, coursePrefs] of Object.entries(coursePrefList)) {    

            // push some data to an array of data which will be used for the course list component in frontend.
            const {courseObj, activityObj} = await this.parseDataAndPrefs(courseCode, coursePrefs); 
            
            courseUIContainer.push(courseObj);
            activityUIContainer[courseCode] = activityObj;
        }

        
        return {courseUIContainer, activityUIContainer};
    }

    // get the courseList ui object for a chosen course. If no preference exist for this course, defaults are used. 
    static async parseDataAndPrefs (courseCode, prefs) {
        const courseData = await courseRepository.readCourse(courseCode);
       
        
        var sc; var uac; var blocks;
        if (prefs) {
            //console.log(prefs)
            sc  =     prefs?.sectionChoice
            uac =     prefs?.sectionPreferences[sc].uniqueActChoice
            blocks =  prefs?.sectionPreferences[sc].commonActBlocks.concat([prefs.sectionPreferences[sc].uniqueActBlocks[uac]]);
        } else {
            sc = 0;
            uac = 0;
            const commonActs = courseData.sections[0].commonActs.map(()=>[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]])
            const uniqueActs = courseData.sections[0].uniqueActs.map(()=>[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]])
            blocks = commonActs.concat([uniqueActs[0]]);
        }
       
        

        return {
            courseObj: ({
                code:               courseCode,                    
                title:              courseData.title,               
                sections:           courseData.sections,       
                uniqueActs:         courseData.sections[sc].uniqueActs,
                sectionChoice:      sc,  
                uniqueActChoice:    uac,    
            }),
            activityObj: ({
                sectChar:           courseData.sections[sc].sect,
                termChar:           courseData.sections[sc].term,
                sectionChoice:      sc,  
                uniqueActChoice:    uac,    
                blocks:             blocks,
            })
        }
    }

    
}


module.exports = CourseService;