const StubDatabase = require('../database/StubDatabase');
const Account = require('../models/Account');

// this file contains the methods which facilitate database communication in the context of account business objects. 
const accountRepository = {
  writeAccount: async (account) => {
    const {key, value} = Account.getKeyValue(account);
    await StubDatabase.write("accounts", key, value);
  },

  readAccount: async (key) => {
    return await StubDatabase.read("accounts", key);
  },

  getKeyFromUsername: async (username) => {
    const allkeys = Array.from(await StubDatabase.allKeys("accounts"))
    return (allkeys.filter(key => key.startsWith(`${username}|`)))[0];
  },

  getKeyFromEmail: async (email) => {
    const allkeys = Array.from(await StubDatabase.allKeys("accounts"))
    return (allkeys.filter(key => key.endsWith(`|${email}`)))[0];
  },
}

module.exports = accountRepository;