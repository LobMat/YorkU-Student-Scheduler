const { Client } = require("pg");
const DatabaseInterface = require("./DatabaseInterface");
// This file contains the methods which facilitate database communication in the context of business objects (just review atp).
class RealDatabase extends DatabaseInterface {
  // Creates a client object to connect to the database. Client obnject parameters are subject to change per device (currently are what work on my local machine).
  static client;
  static {
    (async () => {
      await this.init();
    })();
  }
  static async init() {
    this.client = new Client({
      user: "postgres",
      host: "localhost",
      database: "ystTestDB",
      password: "caleb123", // you MUST change this password to your own password.
      port: 5432,
    });
    await this.client.connect();
    console.log("Connected to database");
  }

  static async write(sql, values) {
    try {
      const res = await this.client.query(sql, values); // write to the database using the passed in sql query and values.
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  }

  static async read(sql, key) {
    try {
      const res = await this.client.query(sql, key);
      return res.rows[0]; // return the first row of the result which is an objects (with fields being columns).
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  }

  static async allKeys(sql) {
    try {
      const res = await this.client.query(sql);
      return res.rows; // return an array of rows (objects) which only have the key field(s).
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  }

  static async allValues(table) {
    let sql = `SELECT * FROM ${table}`;
    try {
      const res = await this.client.query(sql);
      return res.rows; // return an array of rows (objects) which have all fields.
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  }

  static async delete(sql, key) {
    try {
      const res = await this.client.query(sql, key);
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  }

  // deprecated method for deleting from the database. This method is not used in the current iteration but it's logic may be useful later.

  // static async delete(table, key) {
  //   if (table === "reviews") {
  //     let sql = `DELETE FROM reviews WHERE review_id = $1`;
  //     try {
  //       const res = await this.client.query(sql, [key]);
  //       return res.rows;
  //     } catch (err) {
  //       console.error("Database query error:", err);
  //       throw err;
  //     }
  //   } else if (table === "accounts") {
  //     let sql = `DELETE FROM accounts WHERE username_email = $1`;
  //     try {
  //       const res = await this.client.query(sql, [key]);
  //       return res.rows;
  //     } catch (err) {
  //       console.error("Database query error:", err);
  //       throw err;
  //     }
  //   } else if (table === "courses") {
  //     let sql = `DELETE FROM courses WHERE course_code = $1`;
  //     try {
  //       const res = await this.client.query(sql, [key]);
  //       return res.rows;
  //     } catch (err) {
  //       console.error("Database query error:", err);
  //       throw err;
  //     }
  //   } else {
  //     console.error("Table not found");
  //   }
  // }

  static async sizeOf(table) {
    let sql = `SELECT COUNT(*) FROM ${table}`;
    try {
      const res = await this.client.query(sql);
      return parseInt(res.rows[0].count);
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  }

  static async close() {
    await this.client.end();
    console.log("Closed database connection");
  }
}

module.exports = RealDatabase;
