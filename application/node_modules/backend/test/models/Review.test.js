const Review = require('../../src/models/Review');

// #region - instantiation tests
test("Create a fresh Review Instance.", () => {
  const review = new Review(
    12345,
    "EECS2311",
    "calebwj",
    "02/12/2025",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );

  expect(review.reviewID).toBe(12345);
  expect(review.authorUsername).toBe("calebwj");
  expect(review.postedDate).toBe("02/12/2025");
  expect(review.courseCode).toBe("EECS2311");
  expect(review.description).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");

  // should be default, as they were not specified in instantiation.
  expect(review.difficultyRating).toBe(0);
  expect(review.contentRating).toBe(0);
})


test("Create a fresh Review, get it's key-value pair database entry.", () => {
  const review = new Review(
    12345,
    "EECS2311",
    "calebwj",
    "02/12/2025",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );

  const {key, value} = Review.getKeyValue(review);

  expect(key).toBe(12345);
  expect(key).toBe(review.reviewID);
  
  expect(value.author).toBe("calebwj");
  expect(value.author).toBe(review.authorUsername);

  expect(value.date).toBe("02/12/2025");
  expect(value.date).toBe(review.postedDate);

  expect(value.course).toBe("EECS2311");
  expect(value.course).toBe(review.courseCode);
  
  expect(value.description).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
  expect(value.description).toBe(review.description);

  // should be defaults, as they were not specified in instantiation.
  expect(value.difficulty).toBe(0);
  expect(value.quality).toBe(0);
})


test("Given the key-value format of an review, convert it into a review instance.", () => {
  const key = 12345;
  const value = {
    author: "calebwj",
    course: "EECS2311",
    date:"02/12/2025",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    difficulty: 0,
    quality: 0,
  };

  const review = Review.getInstance(key, value);
  
  expect(review.reviewID).toBe(12345);
  expect(review.reviewID).toBe(key);

  expect(review.authorUsername).toBe("calebwj");
  expect(review.authorUsername).toBe(value.author);

  expect(review.postedDate).toBe("02/12/2025");
  expect(review.postedDate).toBe(value.date);

  expect(review.courseCode).toBe("EECS2311");
  expect(review.courseCode).toBe(value.course);

  expect(review.description).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
  expect(review.description).toBe(value.description);

  expect(review.difficultyRating).toBe(0);
  expect(review.contentRating).toBe(0);
}) 
// #endregion