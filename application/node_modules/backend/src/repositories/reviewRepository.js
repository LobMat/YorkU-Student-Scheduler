const RealDatabase = require("../../database/RealDatabase");
const Review = require("../models/Review");

// this file contains the methods which facilitate database communication in the context of review business objects.
const reviewRepository = {
  writeReview: async (review) => {
    let sql = `INSERT INTO reviews VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (review_id)
       DO UPDATE SET 
        review_id = EXCLUDED.review_id,
        author = EXCLUDED.author,
        date = EXCLUDED.date,
        course = EXCLUDED.course,
        description = EXCLUDED.description,
        difficulty = EXCLUDED.difficulty,
        quality = EXCLUDED.quality`;
    const value = await Review.getValueArray(review);
    await RealDatabase.write(sql, value);
  },

  readReview: async (id) => {
    let sql = `SELECT * FROM reviews WHERE review_id = $1`;
    return await RealDatabase.read(sql, [id]); // return the first row of the result as an object (with values within being the columns).
  },
  allReviews: async () => {
    return await RealDatabase.allValues(`reviews`); // return the first row of the result as an object (with values within being the columns).
  },
  nextId: async () => {
    return (await RealDatabase.sizeOf("reviews")) + 1;
  },
};

module.exports = reviewRepository;