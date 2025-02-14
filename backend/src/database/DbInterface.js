//interface for database related methods.
class DatabaseInterface {

    async addAccount(account) {
      throw new Error("Method 'addAccount' is not implemented.");
    }
    
    async getAccount(username) {
      throw new Error("Method 'getAccount' is not implemented.");
    }
    
    async addCourse(course) {
      throw new Error("Method 'addCourse' is not implemented.");
    }
  
    async getCourse(courseCode) {
      throw new Error("Method 'getCourse' is not implemented.");
    }
  
    async addInstructor(instructor) {
      throw new Error("Method 'addInstructor' is not implemented.");
    }
  
    async getInstructor(instructorName) {
      throw new Error("Method 'getInstructor' is not implemented.");
    }
  
    async addReview(review) {
      throw new Error("Method 'addReview' is not implemented.");
    }
    
    async getReview(key) {
      throw new Error("Method 'getReview' is not implemented.");
    }

  }
  
  module.exports = DatabaseInterface;
  