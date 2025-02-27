const RealDatabase = require("../../database/RealDatabase");
const Account = require("../models/Account");

// this file contains the methods which facilitate database communication in the context of account business objects.
const accountRepository = {
  writeAccount: async (account) => {
    let sql = `INSERT INTO accounts VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username_email)
       DO UPDATE SET
        username_email = EXCLUDED.username_email,
        password = EXCLUDED.password,
        "coursePrefs" = EXCLUDED."coursePrefs",
        friends = EXCLUDED.friends,
        requests = EXCLUDED.requests,
        reviews = EXCLUDED.reviews`;
    const value = await Account.getValueArray(account);
    await RealDatabase.write(sql, value);
  },

  readAccount: async (key) => {
    let sql = `SELECT * FROM accounts WHERE username_email = $1`;
    return await RealDatabase.read(sql, [key]); // return the first row of the result as an object (with values within being the columns).
  },

  getKeyFromUsername: async (username) => {
    let sql = `SELECT username_email FROM accounts`;
    const allkeys = await RealDatabase.allKeys(sql); // get all keys from the accounts table
    return Object.values(allkeys.filter((key) =>
      key.username_email.startsWith(`${username}|`)
    )[0])[0]; // get the first key that starts with the username
  },

  getKeyFromEmail: async (email) => {
    let sql = `SELECT username_email FROM accounts`;
    const allkeys = await RealDatabase.allKeys(sql); // get all keys from the accounts table
    return allkeys.filter((key) => key.username_email.endsWith(`|${email}`))[0]; // get the first key that ends with the email
  },
};

module.exports = accountRepository;