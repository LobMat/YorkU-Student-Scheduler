//interface for database related methods.
class DatabaseInterface {

  
    static async write(target, key, value) {
      throw new Error("Method 'write' is not implemented.");
    }
    
    //read the data matching 'key' in 'target' collection
    static async read(target, key) {
      throw new Error("Method 'read' is not implemented.");
    }
    
    // delete the data matching 'key' in 'target' collection
    static async delete(target, key) {
      throw new Error("Method 'delete' is not implemented.");
    }
  }
  
  module.exports = DatabaseInterface;
  