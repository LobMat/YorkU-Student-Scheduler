const StubDatabase = require( '../database/StubDatabase.js');
const Review = require('../models/Review');

// this file contains the methods which facilitate database communication in the context of review business objects. 
const reviewRepository = {
  writeReview: async (review) => {
    const {key, value} = Review.getKeyValue(review);
    await StubDatabase.write("reviews", key, value);
  },

  readReview: async (id) => {
    const reviewLiteral = await StubDatabase.read("reviews", id);
    return reviewLiteral;
  },

  nextId: async () => {
    return StubDatabase.sizeOf("reviews") + 1;
  }
  
};

module.exports = reviewRepository