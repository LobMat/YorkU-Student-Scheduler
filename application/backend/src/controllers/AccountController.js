// a collection of controllers which make service calls related to 'Account' business objects.
const AccountService = require('../services/AccountService');

exports.registerAccountController = async (req, res) => {
  const { username, email, passOne, passTwo, coursePrefs } = req.body;
  const { key, errFlags } = await AccountService.register(username, email, passOne, passTwo, coursePrefs);
  if (key) {
    res.status(200).json({});
  } else {
    res.status(201).json({errFlags: errFlags});
  }
}

exports.loginController = async (req, res) => {
  const idField = req.query.idField;
  const password = req.query.password;
  const {key, err} = await AccountService.login(idField, password);
  if (key) {
    res.status(200).json({key:key});
  } else {
    res.status(201).json({err:err});
  }
}

exports.verifyIDController = async (req, res) => {
  if (await AccountService.accountExists(req.query.id)) {
    res.status(200).json();
  } else {
    res.status(400).json();
  }
}

exports.storePrefsController = async (req, res) => {
  const {username, prefs} = req.body;
  await AccountService.writePrefs(username, prefs);
  res.status(200).json();
}