class Review {
    constructor(quality, difficulty, text) {
      this.quality = quality;
      this.difficulty = difficulty;
      this.text = text;
    }
  
    // method to get the rating
    getDifficulty() {
      return this.difficulty;
    }

    // method to get the rating
    getQuality() {
      return this.quality;
    }
  
    // method to get the text
    getText() {
      return this.text;
    }
  }
  
  module.exports = Review;
