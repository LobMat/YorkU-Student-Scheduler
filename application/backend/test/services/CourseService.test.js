const Course = require('../../src/models/Course');
const CourseService = require('../../src/services/CourseService');
const courseRepository = require('../../src/repositories/courseRepository')
const StubDatabase = require('../../database/StubDatabase')
const {writeCourseData} = require('../../src/database/WriteDummyData');

// test cases for Course business logic.

//#region - test getCourseObject , which formats a course from the database into a frontend ui object.
test("Get formatted course objects from the database which exist.", async () => {
  StubDatabase.init();
  await writeCourseData();  //write hard-coded dummy data

  const courseInstance1 = Course.getInstance('EECS2311', await courseRepository.readCourse('EECS2311'));
  const frontendData1 = await CourseService.getCourseObject('EECS2311');

  expect(frontendData1).not.toBe(undefined);
  expect(frontendData1.code).toBe(courseInstance1.courseCode);
  expect(frontendData1.title).toBe(courseInstance1.courseTitle);
  
  expect(frontendData1.sections.length).toBe(2);
  expect(frontendData1.sections).toStrictEqual(courseInstance1.sectionList);

  expect(frontendData1.uniqueActs.length).toBe(1);
  expect(frontendData1.uniqueActs).toStrictEqual(courseInstance1.sectionList[0].uniqueActs);
  
  expect(frontendData1.sectionChoice).toBe(0);
  expect(frontendData1.uniqueActChoice).toBe(0);
  expect(frontendData1.blocks).toStrictEqual([]);

  const courseInstance2 = Course.getInstance('EECS2200', await courseRepository.readCourse('EECS2200'));
  const frontendData2 = await CourseService.getCourseObject('EECS2200');

  expect(frontendData2).not.toBe(undefined);
  expect(frontendData2.code).toBe(courseInstance2.courseCode);
  expect(frontendData2.title).toBe(courseInstance2.courseTitle);
  
  expect(frontendData2.sections.length).toBe(2);
  expect(frontendData2.sections).toStrictEqual(courseInstance2.sectionList);

  expect(frontendData2.uniqueActs.length).toBe(5);
  expect(frontendData2.uniqueActs).toStrictEqual(courseInstance2.sectionList[0].uniqueActs);
  
  expect(frontendData2.sectionChoice).toBe(0);
  expect(frontendData2.uniqueActChoice).toBe(0);
  expect(frontendData2.blocks).toStrictEqual([]);
})

test("Try to get formatted course object which does not exist", async() => {
  StubDatabase.init();
  await writeCourseData();  //write hard-coded dummy data
  const frontendData = await CourseService.getCourseObject('FAKE1234');
  expect(frontendData).toBe(undefined);
})
//#endregion

//#region - test loading courses from preference map (initial selections and activity times)
test("Get a list of courses from a preference map", async () => {
  StubDatabase.init();
  await writeCourseData();

  //smaller version of preference map. only contains preferences data relevant to the method being tested
  const preferenceMap = {
    'EECS2311': {
      sectionChoice: 1, 
      sectionPreferences: [
        {},
        {
          uniqueActChoice: 0, 
          commonActBlocks: [1,2,3,4,5],
          uniqueActBlocks: [6],
        }
      ]
    },
    'EECS2200': {
      sectionChoice: 0, 
      sectionPreferences: [
        {
          uniqueActChoice: 3, 
          commonActBlocks: [1,2,3,4,5],
          uniqueActBlocks: [6,7,8,9,0],
        }
      ]
    },
  }

  const [course1, course2] = await CourseService.getInitialCourseList(preferenceMap);
  expect(course1).not.toBe(undefined);
  expect(course2).not.toBe(undefined);
  const courseInstance1 = Course.getInstance('EECS2311', await courseRepository.readCourse('EECS2311'));  
  const courseInstance2 = Course.getInstance('EECS2200', await courseRepository.readCourse('EECS2200'));

  //test that course1 was correctly loaded
  expect(course1.code).toBe(courseInstance1.courseCode);
  expect(course1.title).toBe(courseInstance1.courseTitle);
  expect(course1.sections).toStrictEqual(courseInstance1.sectionList);
  expect(course1.sectionChoice).toBe(1);
  expect(course1.uniqueActs).toStrictEqual(courseInstance1.sectionList[1].uniqueActs);
  expect(course1.uniqueActChoice).toBe(0);
  expect(course1.blocks).toStrictEqual([1,2,3,4,5,6]);

  expect(course2.code).toBe(courseInstance2.courseCode);
  expect(course2.title).toBe(courseInstance2.courseTitle);
  expect(course2.sections).toStrictEqual(courseInstance2.sectionList);
  expect(course2.sectionChoice).toBe(0);
  expect(course2.uniqueActs).toStrictEqual(courseInstance2.sectionList[0].uniqueActs);
  expect(course2.uniqueActChoice).toBe(3);
  expect(course2.blocks).toStrictEqual([1,2,3,4,5,9]);


})

test("Get a list of courses from an empty preference map", async () => {
  StubDatabase.init();
  await writeCourseData();

  const courseList = await CourseService.getInitialCourseList({});
  expect(courseList).toStrictEqual([]);
})

test("Get a list of courses where some courses exist and others dont", async () => {
  StubDatabase.init();
  await writeCourseData();

  //smaller version of preference map. only contains preferences data relevant to the method being tested
  const preferenceMap = {
    'EECS2311': {
      sectionChoice: 1, 
      sectionPreferences: [
        {},
        {
          uniqueActChoice: 0, 
          commonActBlocks: [1,2,3,4,5],
          uniqueActBlocks: [6],
        }
      ]
    },
    'EECS0000': { //this does not exist
      sectionChoice: 0, 
      sectionPreferences: [
        {
          uniqueActChoice: 3, 
          commonActBlocks: [1,2,3,4,5],
          uniqueActBlocks: [6,7,8,9,0],
        }
      ]
    },
  }

  const [course1, course2] = await CourseService.getInitialCourseList(preferenceMap);
  expect(course1).not.toBe(undefined);
  expect(course2).toBe(undefined);
  const courseInstance1 = Course.getInstance('EECS2311', await courseRepository.readCourse('EECS2311'));  
  //test that course1 was still correctly loaded
  expect(course1.code).toBe(courseInstance1.courseCode);
  expect(course1.title).toBe(courseInstance1.courseTitle);
  expect(course1.sections).toStrictEqual(courseInstance1.sectionList);
  expect(course1.sectionChoice).toBe(1);
  expect(course1.uniqueActs).toStrictEqual(courseInstance1.sectionList[1].uniqueActs);
  expect(course1.uniqueActChoice).toBe(0);
  expect(course1.blocks).toStrictEqual([1,2,3,4,5,6]);

})

//#endregion
  
//////

