
const { Course, CourseUtils } = require("../models/Course");

const courseRepository = require("../repositories/courseRepository.js")
async function writeCourseData() {

    const c1 = new Course("EECS2311", "Software Development Project");
    const c1s1 = c1.addSection("X", "W", "Hadi Hemmati");
    CourseUtils.addActivity(c1s1, "LECT01", "", "Hadi Hemmati");
    CourseUtils.addActivity(c1s1, "LAB 01", "E18Y02");
    const c1s2 = c1.addSection("Z", "W", "Hadi Hemmati");
    CourseUtils.addActivity(c1s2, "LECT01", "", "Hadi Hemmati");
    CourseUtils.addActivity(c1s2, "LAB 01", "U65T02");
    courseRepository.writeCourse(c1);

    
    const c2 = new Course("EECS2200", "Electrical Circuits");
    const c2s1 = c2.addSection("E", "F", "Hossein Kassiri");
    CourseUtils.addActivity(c2s1, "LECT01", "", "Hossein Kassiri");
    CourseUtils.addActivity(c2s1, "LAB 01", "D72Z02");
    CourseUtils.addActivity(c2s1, "LAB 02", "D72Z03");
    CourseUtils.addActivity(c2s1, "LAB 03", "D72Z04");
    CourseUtils.addActivity(c2s1, "LAB 04", "D72Z05");
    CourseUtils.addActivity(c2s1, "LAB 05", "D72Z06");
    const c2s2 = c2.addSection("Z", "W", "Gerd Grau");
    CourseUtils.addActivity(c2s2, "LECT01", "", "Gerd Grau");
    CourseUtils.addActivity(c2s2, "LAB 01", "U19W02");
    CourseUtils.addActivity(c2s2, "LAB 02", "U19W03");
    CourseUtils.addActivity(c2s2, "LAB 03", "U19W04");
    CourseUtils.addActivity(c2s2, "LAB 04", "U19W05");
    CourseUtils.addActivity(c2s2, "LAB 05", "U19W06");
    courseRepository.writeCourse(c2);


    //


    const c3 = new Course("EECS2101", "Fundamentals of Data Structures");

    const c3s1 = c3.addSection("A", "F", "Andriy Pavlovych");
    CourseUtils.addActivity(c3s1, "LECT01", "Y43S01", "Andriy Pavlovych");

    const c3s2 = c3.addSection("E", "F", "Uyen T Nguyen");
    CourseUtils.addActivity(c3s2, "LECT01", "E90E01", "Uyen T Nguyen");

    const c3s3 = c3.addSection("M", "W", "Jeffery A Edmonds");
    CourseUtils.addActivity(c3s3, "LECT01", "V37M01", "Jeffery A Edmonds");

    const c3s4 = c3.addSection("N", "W", "Sunila Akbar");
    CourseUtils.addActivity(c3s4, "LECT01", "Z84V01", "Sunila Akbar");

    const c3s5 = c3.addSection("X", "W", "Jackie Wang");
    CourseUtils.addActivity(c3s5, "LECT01", "X31H01", "Jackie Wang");

    const c3s6 = c3.addSection("Z", "W", "Jackie Wang");
    CourseUtils.addActivity(c3s6, "LECT01", "B78Q01", "Jackie Wang");

    courseRepository.writeCourse(c3);


    //


    const c4 = new Course("EECS2032", "Introduction to Embedded Systems");

    const c4s1 = c4.addSection("E", "F", "Sunila Akbar");
    CourseUtils.addActivity(c4s1, "LECT01", "", "Sunila Akbar");
    CourseUtils.addActivity(c4s1, "LAB 01", "Y48M02");
    CourseUtils.addActivity(c4s1, "LAB 02", "Y48M03");

    const c4s2 = c4.addSection("Z", "W", "Sunila Akbar");
    CourseUtils.addActivity(c4s2, "LECT01", "", "Sunila Akbar");
    CourseUtils.addActivity(c4s2, "LAB 01", "E95V02");
    CourseUtils.addActivity(c4s2, "LAB 02", "E95V03");
    courseRepository.writeCourse(c4);


    //

    const c5 = new Course("EECS2021", "Computer Organization");

    const c5s1 = c5.addSection("A", "F", "Pooja Vashisth");
    CourseUtils.addActivity(c5s1, "LECT01", "", "Pooja Vashisth");
    CourseUtils.addActivity(c5s1, "LAB 01", "U07M02");
    CourseUtils.addActivity(c5s1, "LAB 02", "U07M03");

    const c5s2 = c5.addSection("B", "F", "Kamen Kanev");
    CourseUtils.addActivity(c5s2, "LECT01", "", "Kamen Kanev");
    CourseUtils.addActivity(c5s2, "LAB 01", "N54V02");
    CourseUtils.addActivity(c5s2, "LAB 02", "N54V03");

    const c5s3 = c5.addSection("E", "F", "Ali Sadeghi-Naini");
    CourseUtils.addActivity(c5s2, "LECT01", "", "Ali Sadeghi-Naini");
    CourseUtils.addActivity(c5s2, "LAB 01", "H01H02");
    CourseUtils.addActivity(c5s2, "LAB 02", "H01H03");

    const c5s4 = c5.addSection("F", "F", "Amirali Amirsoleimani");
    CourseUtils.addActivity(c5s4, "LECT01", "", "Amirali Amirsoleimani");
    CourseUtils.addActivity(c5s4, "LAB 01", "A48Q02");
    CourseUtils.addActivity(c5s4, "LAB 02", "A48Q03");

    const c5s5 = c5.addSection("M", "W", "Kamen Kanev");
    CourseUtils.addActivity(c5s5, "LECT01", "", "Kamen Kanev");
    CourseUtils.addActivity(c5s5, "LAB 01", "Q95B02");
    CourseUtils.addActivity(c5s5, "LAB 02", "Q95B03");

    const c5s6 = c5.addSection("N", "W", "Pooja Vashisth");
    CourseUtils.addActivity(c5s6, "LECT01", "", "Pooja Vashisth");
    CourseUtils.addActivity(c5s6, "LAB 01", "K42K02");
    CourseUtils.addActivity(c5s6, "LAB 02", "K42K03");

    const c5s7 = c5.addSection("Z", "W", "James A. Smith");
    CourseUtils.addActivity(c5s7, "LECT01", "", "James A. Smith");
    CourseUtils.addActivity(c5s7, "LAB 01", "D89T02");
    CourseUtils.addActivity(c5s7, "LAB 02", "D89T03");

    courseRepository.writeCourse(c5);




}

module.exports = writeCourseData; 