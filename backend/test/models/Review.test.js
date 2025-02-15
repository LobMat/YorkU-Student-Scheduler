
const Account = require("../../models/Account");
const Course = require('../../models/Course');
const Section = require('../Section');
const Instructor = require('../../models/Instructor');
const StubDatabase = require('../src/database/StubDatabase');

beforeAll(async () => {
  await StubDatabase.init();

  const accountData = {
    username: "mattthew",
    password: "123pass",
    email: "mattthew@hotmail.com",
    enrolledCourses: [],
  };
  await StubDatabase.create("accounts", "mattthew", accountData);
});

test("Create a new account", () => {
  let newAccount = new Account(
    "mattthew",
    "123pass",
    "mattthew@hotmail.com",
    [],
    []
  );
  expect(newAccount.getUsername()).toBe("mattthew");
  expect(newAccount.getPassword()).toBe("123pass");
  expect(newAccount.getEmail()).toBe("mattthew@hotmail.com");
  expect(newAccount.getEnrolledCourses()).toEqual([]);
  expect(newAccount.getFriendList()).toEqual([]);
});

test("Create a new professor", () => {
  let professor = new Instructor("Dr. Smith");
  expect(professor.getInstructorName()).toBe("Dr. Smith");
});

test("Create a new section and add the professor to it", () => {
  let professor = new Instructor("Dr. Smith");
  let section = new Section("A", "F", professor);
  expect(section.letter).toBe("A");
  expect(section.professor).toBe(professor);
});

test("Create a new course and add the section to it", () => {
  let professor = new Instructor("Dr. Smith");
  let section = new Section("A", professor);
  let newCourse = new Course("COMPSCI 101", "Introduction to Computer Science", [section]);
  expect(newCourse.courseCode).toBe("COMPSCI 101");
  expect(newCourse.courseTitle).toBe("Introduction to Computer Science");
  expect(newCourse.sectionList).toEqual([section]);
});

test("Add a review to the course through the account", () => {
  let newAccount = new Account(
    "mattthew",
    "123pass",
    "mattthew@hotmail.com",
    [],
    []
  );
  let professor = new Instructor("Dr. Smith");
  let section = new Section("A", professor);
  let newCourse = new Course("COMPSCI 101", "Introduction to Computer Science", [section]);
  newAccount.addEnrolledCourse(newCourse);
  newAccount.addReview("COMPSCI 101", "A", 5, 5, "Great course!");
  expect(newAccount.getReviews("COMPSCI 101").length).toBe(1);
});

test("Check if the course is added to the account", () => {
  let newAccount = new Account(
    "mattthew",
    "123pass",
    "mattthew@hotmail.com",
    [],
    []
  );
  let professor = new Instructor("Dr. Smith");
  let section = new Section("A", professor);
  let newCourse = new Course("COMPSCI 101", "Introduction to Computer Science", [section]);
  newAccount.addEnrolledCourse(newCourse);
  const enrolledCourses = newAccount.getEnrolledCourses();
  expect(enrolledCourses.length).toBe(1);
  expect(enrolledCourses[0].courseCode).toBe("COMPSCI 101");
});

test("Check if the review is added to the course", () => {
  let newAccount = new Account(
    "mattthew",
    "123pass",
    "mattthew@hotmail.com",
    [],
    []
  );
  let professor = new Instructor("Dr. Smith");
  let section = new Section("A", professor);
  let newCourse = new Course("COMPSCI 101", "Introduction to Computer Science", [section]);
  newAccount.addEnrolledCourse(newCourse);
  newAccount.addReview("COMPSCI 101", "A", 5, 5, "Great course!");
  const reviews = newAccount.getReviews("COMPSCI 101");
  expect(reviews.length).toBe(1);
  expect(reviews[0].text).toBe("Great course!");
});

test("Check if the review is added to the professor", () => {
  let newAccount = new Account(
    "mattthew",
    "123pass",
    "mattthew@hotmail.com",
    [],
    []
  );
  let professor = new Instructor("Dr. Smith");
  let section = new Section("A", "F", professor);
  let newCourse = new Course("COMPSCI 101", "Introduction to Computer Science", [section]);
  newAccount.addEnrolledCourse(newCourse);
  newAccount.addReview("COMPSCI 101", "A", 5, 5, "Great course!");
  const professorReviews = professor.getReviews();
  expect(professorReviews.length).toBe(1);
  expect(professorReviews[0].text).toBe("Great course!");
});
