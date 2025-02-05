// An interface for database related methods, allowing easy transition from stub to real database implementations.
// If these methods are called rather than an overridden version, an error will be thrown. 

class DatabaseInterface {

  // write key-value pair to collection with name 'target'.
  static async write(target, key, value) {
    throw new Error("Method 'write' has not been implemented yet.");
  }

  // read the value associated with 'key' from collection with name 'target'
  static async read(target, key) {
    throw new Error("Method 'read' has not been implemented yet.");
  }

  // get the list of keys in the collection with name 'target'.
  static async allKeys(target) {
    throw new Error("Method 'allKeys' has not been implemented yet.");
  }

  // get the list of values in the collection with name 'target'.
  static async allValues(target) {
    throw new Error("Method 'allValues' has not been implemented yet.");
  }

  // delete the key-value pair with the provided key from the collection with name 'target'.
  static async delete(target, key) {
    throw new Error("Method 'delete' has not been implemented yet.");
  }

}

module.exports = DatabaseInterface;