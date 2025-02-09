const DatabaseInterface = require('./DatabaseInterface');

// this class is a stub implementation of the database we will use in the future. It is used for unit testing.

// In this stub implementation, we will emulate a collection database system with JavaScript's Map datastructure (holds key-value pairs) representing collections.
// Each element of a collection in our implementation will be an object literal filled with pieces of data from our models (business objects), because typically 
// only object literals can be sent to a real database.

// We implement methods from the 'DatabaseInterface.js' interface. The real database will also implement these methods.
// This means that switching to the real database will require little syntactical change in other programs containing logic.

class StubDatabase extends DatabaseInterface {

    static collections;
    
    static {
      this.init();
    }

    static async init() {
        this.collections  = new Map();
        this.collections.set("accounts", new Map());       // collection of accounts. each account is identified by a key containing its username and email.
        this.collections.set("courses", new Map());        // collection of courses. each course is identified by its course code (e.g. EECS 2311, ENG 2001). 
        this.collections.set("reviews", new Map());        // collection of reviews. reviews do not have unique identifiers. Instead, they are sorted into lists by common fields. 
    }
  
    static async write(target, key, value) {
        await this.collections.get(target).set(key, value);
    }

    static async read(target, key) {
        const value = await this.collections.get(target).get(key);
        return (!value) ? undefined : value;
    }

    static async allKeys(target) {
        return this.collections.get(target).keys() ;
    }

    static async allValues(target) {
        return Object.values(this.collections.get(target));
    }

    static async delete(target, key) {
        this.collections.delete(target, key);
    }


}

module.exports = StubDatabase;