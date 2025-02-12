const Course = require('../../src/models/Course');

// this file contains test cases exclusively for Course instance method. This means NO database communication 
// or communication with other models, as these are done through the database.



// #region - instantiation tests
test("Create a fresh Course Instance.", () => {
  const course = new Course(
    "EECS2311",
    "Software Development Project",
  );

  expect(course.courseCode).toBe("EECS2311");
  expect(course.courseTitle).toBe("Software Development Project");

  // should be default, as they were not specified in instantiation.
  expect(course.sectionList).toStrictEqual([]);
  expect(course.reviewList).toStrictEqual([]);
  expect(course.difficultyRating).toBe(0);
  expect(course.contentRating).toBe(0);
})


test("Create a fresh Course, get it's key-value pair database entry.", () => {
  const course = new Course(
    "EECS2311",
    "Software Development Project",
  );

  const {key, value} = Course.getKeyValue(course);

  expect(key).toBe('EECS2311');
  expect(key).toBe(course.courseCode);
  
  expect(value.title).toBe('Software Development Project');
  expect(value.title).toBe(course.courseTitle);

  // should be defaults, as they were not specified in instantiation.
  expect(value.sections).toStrictEqual([]);
  expect(value.reviews).toStrictEqual([]);
  expect(value.difficulty).toBe(0);
  expect(value.quality).toBe(0);
})


test("Given the key-value format of a course, convert it into a course instance.", () => {
  const key = 'EECS2200';
  const value = {
    title: 'Electrical Circuits',
    sections: [],
    reviews: [],
    difficulty: 0,
    quality: 0,
  };

  const course = Course.getInstance(key, value);
  
  expect(course.courseCode).toBe('EECS2200');
  expect(course.courseCode).toBe(key);
  expect(course.courseTitle).toBe('Electrical Circuits');
  expect(course.courseTitle).toBe(value.title);

  expect(course.sectionList).toStrictEqual([]);
  expect(course.reviewList).toStrictEqual([]);
  expect(course.difficultyRating).toBe(0);
  expect(course.contentRating).toBe(0);

}) 
// #endregion

// #region - adjusting review list tests
test("Add reviews to an Course instance. No duplicate handling on this layer." , () => {
  const course = new Course(
    "EECS2311",
    "Software Development Project",
  );
  expect(course.reviewList.length).toBe(0);
  expect(course.reviewList).toStrictEqual([]);

  course.addReview(12345);
  expect(course.reviewList.length).toBe(1)
  expect(course.reviewList[0]).toBe(12345);
  expect(course.reviewList).toStrictEqual([12345]);

  course.addReview(21110);
  expect(course.reviewList.length).toBe(2)
  expect(course.reviewList[1]).toBe(21110);
  expect(course.reviewList).toStrictEqual([12345, 21110]);

  course.addReview(64532);
  expect(course.reviewList.length).toBe(3)
  expect(course.reviewList[2]).toBe(64532);
  expect(course.reviewList).toStrictEqual([12345, 21110,64532]);
});

test("Add reviews to an Course instance, ensure changes reflect in key-value pair", () => {
  const course = new Course(
    "EECS2311",
    "Software Development Project",
  );
  var value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(0);
  expect(value.reviews).toStrictEqual([]);

  course.addReview(12345);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(1)
  expect(value.reviews[0]).toBe(12345);
  expect(value.reviews).toStrictEqual([12345]);

  course.addReview(21110);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(2)
  expect(value.reviews[1]).toBe(21110);
  expect(value.reviews).toStrictEqual([12345,21110]);

  course.addReview(64532);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(3)
  expect(value.reviews[2]).toBe(64532);
  expect(value.reviews).toStrictEqual([12345,21110,64532]);
});

test("Add and remove reviews from an Course instance." , () => {
  const course = new Course(
    "EECS2311",
    "Software Development Project",
  );

  course.addReview(12345);
  course.addReview(21110);

  course.removeReview(12345);
  expect(course.reviewList.length).toBe(1);
  expect(course.reviewList).toStrictEqual([21110]);
  
  course.addReview(64532);
  course.addReview(31523);
  expect(course.reviewList.length).toBe(3);
  expect(course.reviewList).toStrictEqual([21110,64532,31523]);

  course.removeReview(31523);
  expect(course.reviewList.length).toBe(2);
  expect(course.reviewList).toStrictEqual([21110,64532]);
  
  course.removeReview(21110);
  expect(course.reviewList.length).toBe(1);
  expect(course.reviewList).toStrictEqual([64532]);
  
  course.removeReview(64532);
  expect(course.reviewList.length).toBe(0);
  expect(course.reviewList).toStrictEqual([]);

  //remove friend that doesnt exist
  course.removeReview(55555);
  expect(course.reviewList.length).toBe(0);
  expect(course.reviewList).toStrictEqual([]);
});

test("Add and remove reviews from an Course instance, ensure changes reflect in key-value pair" , () => {
  const course = new Course(
    "EECS2311",
    "Software Development Project",
  );

  course.addReview(12345);
  course.addReview(21110);

  course.removeReview(12345);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(1);
  expect(value.reviews).toStrictEqual([21110]);
  
  course.addReview(64532);
  course.addReview(31523);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(3);
  expect(value.reviews).toStrictEqual([21110,64532,31523]);

  course.removeReview(31523);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(2);
  expect(value.reviews).toStrictEqual([21110,64532]);
  
  course.removeReview(21110);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(1);
  expect(value.reviews).toStrictEqual([64532]);
  
  course.removeReview(64532);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(0);
  expect(value.reviews).toStrictEqual([]);

  //remove friend that doesnt exist
  course.removeReview(55555);
  value = Course.getKeyValue(course).value;
  expect(value.reviews.length).toBe(0);
  expect(value.reviews).toStrictEqual([]);
});

//#endregion

