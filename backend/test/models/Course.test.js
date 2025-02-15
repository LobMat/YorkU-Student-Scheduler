// this test file is testing the creation and manipulation of Course business objects, encompasing the Course class, the Section class, and the Activity class. 

const { Course, Section, Activity }  = require('../../models/Course');

test('create an empty \'Course\' business object.', () => {
    course1 = new Course("EECS 2101", "Fundamentals of Data Structures")
    
    expect(course1.courseCode).toBe("EECS 2101");
    expect(course1.courseTitle).toBe("Fundamentals of Data Structures");
    expect(course1.sectionList.length).toBe(0);
    expect(course1.reviewList.length).toBe(0);
    expect(course1.difficulty).toBe(0);
    expect(course1.quality).toBe(0);
})

test('create empty sections and add them to a \'Course\' business object.', () => {
    course1 = new Course("EECS 2101", "Fundamentals of Data Structures");
    
    // adding one section to the course.
    section1 = new Section("X", "W", "Jackie Wang");
    course1.addSection(section1);

    expect(course1.sectionList.length).toBe(1);
    expect(course1.sectionList[0].letter).toBe("X");
    expect(course1.sectionList[0].term).toBe("W");
    expect(course1.sectionList[0].instructor).toBe("Jackie Wang");

    // adding a second section to the course.
    section2 = new Section("Z", "W", "Jackie Wang");
    course1.addSection(section2);
    expect(course1.sectionList.length).toBe(2);
    expect(course1.sectionList[1].letter).toBe("Z");
    expect(course1.sectionList[1].term).toBe("W");
    expect(course1.sectionList[1].instructor).toBe("Jackie Wang");
})

test('attempt to add two sections with the same letter.', () => {
    course1 = new Course("EECS 2101", "Fundamentals of Data Structures");
    
    // adding one section to the course.
    section1 = new Section("X", "W", "Jackie Wang");
    course1.addSection(section1);

     // adding another section to the course with the same name.
    section2 = new Section("X", "W", "Jackie Wang");
    expect(() => { course1.addSection(section2); }).toThrowError("ERROR: Section with this letter already exists in this course.");
    expect(course1.sectionList.length).toBe(1);
})

test('create activities with and without catalogue numbers and add them to a section.', () => {
    
    section1 = new Section("X", "W", "Jackie Wang");
    section1.addActivity(new Activity("LECT01"));
    section1.addActivity(new Activity("LAB01", "XZ9C31"));
    section1.addActivity(new Activity("LAB02", "XZ9C32"));

    expect(section1.activities.length).toBe(3);
    expect(section1.activities[0].name).toBe("LECT01");
    expect(section1.activities[0].cat).toBe("");
    expect(section1.activities[1].name).toBe("LAB01");
    expect(section1.activities[1].cat).toBe("XZ9C31");
    expect(section1.activities[2].name).toBe("LAB02");
    expect(section1.activities[2].cat).toBe("XZ9C32");

})

test('attempt to add two activities with the same name to a section.', () => {
    section1 = new Section("X", "W", "Jackie Wang");

    section1.addActivity(new Activity("LECT01"));
    expect(() => { section1.addActivity(new Activity("LECT01", "XZ9C31")); }).toThrowError("ERROR: Activity with this name already exists in this section.");

    expect(section1.activities.length).toBe(1);

})

test('attempt to add two activities with the same catalogue number to a section.', () => {
    section1 = new Section("X", "W", "Jackie Wang");

    section1.addActivity(new Activity("LAB01", "XZ9C31"));
    expect(() => { section1.addActivity(new Activity("LAB02", "XZ9C31")); }).toThrowError("ERROR: Activity with this catalogue number already exists in this section.");

    expect(section1.activities.length).toBe(1);

})
