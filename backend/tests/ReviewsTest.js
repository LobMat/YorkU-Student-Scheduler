const Review = require('../src/business-objects/Review'); // Adjust the path as necessary
const Account = require("../src/business-objects/Account");
const Course = require('../src/business-objects/Course');
const Section = require('../src/business-objects/Section');
const Instructor = require('../src/business-objects/Instructor');

//Does not run currently
test("Create a new account, course, and professor, and add a review", () => {
  // Create a new account
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

  // Create a new professor
  let professor = new Instructor("Dr. Smith");

  // Create a new section and add the professor to it
  let section = new Section("A", professor);

  // Create a new course and add the section to it
  let newCourse = new Course("COMPSCI 101", "Introduction to Computer Science", [section]);
  newAccount.addEnrolledCourse(newCourse);

  // Add a review to the course through the account
  newAccount.addReview(newCourse, "A", 5, 5, "Great course!");

  // Check if the course is added to the account
  expect(newAccount.getEnrolledCourses()).toEqual([newCourse]);

  // Check if the review is added to the course
  const reviews = newAccount.getReviews("COMPSCI 101");
  expect(reviews.length).toBe(1);
  expect(reviews[0]).toEqual({ quality: 5, difficulty: 5, text: "Great course!" });

  // Check if the review is added to the professor
  const professorReviews = professor.getReviews();
  expect(professorReviews.length).toBe(1);
  expect(professorReviews[0]).toEqual({ quality: 5, difficulty: 5, text: "Great course!" });
});
