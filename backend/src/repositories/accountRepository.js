const StubDatabase = require('../database/StubDatabase'); //import database access tool. in final implementation, this layer may not exist.

exports.accountRepository = {
  writeAccount: async (account) => {
      await StubDatabase.write("accounts", `${account.username}|${account.email}`, account.getLiteral());
  },

  readAccount: async (key) => {
    return await StubDatabase.read("accounts", key);
  },

  getKeyFromUsername: async (username) => {
    const allkeys = Array.from(await StubDatabase.readAllKeys("accounts"))
    return (allkeys.filter(key => key.startsWith(`${username}|`)))[0];
  },

  getKeyFromEmail: async (email) => {
    const allkeys = Array.from(await StubDatabase.readAllKeys("accounts"))
    return (allkeys.filter(key => key.endsWith(`|${email}`)))[0];
  },
}
