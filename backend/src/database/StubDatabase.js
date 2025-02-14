// this program is a simulation of how our firestore database will be set up in the future for unit testing.

// In firestore, we have different 'collections' of references to 'documents'. Each 'document' has a unique identifier and fields associated with it.
// In this stub implementation, we will emulate this with JavaScript's Map datastructure (holds key-value pairs) representing collections.
// Each 'document' in our implementation will be an object literal filled with pieces of data from our models (business objects) because only object literals can be sent to firestore

// We implement methods from the 'dbInterface.js' interface. The real database will also implement these methods.
// This means that switching to the firestore database will require little syntactical change in other programs containing logic.

const DatabaseInterface = require('./dbInterface');

class StubDatabase extends DatabaseInterface {

    static collections;
    
    static async init() {
        this.collections  = new Map();
        this.collections.set("accounts", new Map());       // collection of accounts. each account document is identified by its username.
        this.collections.set("courses", new Map());        // collection of courses. each course document is identified by its course code (e.g. EECS 2311, ENG 2001). 
        this.collections.set("instructors", new Map());    // collection of instructors. each instructor is identified by their name.
        this.collections.set("reviews", new Map());        // collection of reviews. reviews do not have unique identifiers. Instead, they are sorted into lists by common fields. 
    }
  
    static async write(target, key, value) {
        await this.collections.get(target).set(key, value);
    }

    static async read(target, key) {
        const value = await this.collections.get(target).get(key);
        return (!value) ? null : value;
    }

    static async readAllKeys(target) {
        return this.collections.get(target).keys() ;
    }

    static async readAllValues(target) {
        return Object.values(this.collections.get(target));
    }

    static async delete(target, key) {
        this.collections.delete(target, key);
    }


}

module.exports = StubDatabase;