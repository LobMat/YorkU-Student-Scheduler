// a collection of controllers which make service calls related to 'Account' business objects.
const AccountService = require('../services/AccountService');

exports.registerAccountController = async (req, res) => {
  const { username, email, passOne, passTwo, coursePrefs } = req.body;
  const { key, errFlags } = await AccountService.register(username, email, passOne, passTwo, coursePrefs);
  if (key) {
    res.status(400).json({});
  } else {
    res.status(201).json({errFlags: errFlags});
  }
}

exports.loginController = async (req, res) => {
  const idField = req.query.idField;
  const password = req.query.password;
  const {key, prefs, err} = await AccountService.login(idField, password);
  if (!err) {
    res.status(200).json({key:key, prefs:prefs});
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

exports.storePrefsAndCustomActsController = async (req, res) => {
  const {username, prefs, customActs} = req.body;
  await AccountService.storePrefsAndCustomActs(username, prefs, customActs);
  res.status(200).json();
}

exports.sendFriendRequestController = async(req, res) => {
  const {sender, receiver} = req.body;
  const status = 200 + await AccountService.sendFriendRequest(sender, receiver);
  res.status(status).json();
}

exports.getFriendsController = async(req,res) => {
  const username = req.query.user;
  const friends = await AccountService.getFriendslist(username);
  if (friends) {
    res.status(200).json({success: true, friends: friends});
  } else {
    res.status(400).json({success: false, friends: []});
  }
}

//#region - controllers for friends list dev testing.
exports.switchAccountController = async(req,res) => {
  const{newUsername} = req.body;
  const key = await AccountService.getKeyFromUsername(newUsername);
  
  if (key)  res.status(200).json({key: key});
  else      res.status(201).json();
  
}
exports.clearFriendsController = async(req, res) => {
  const{id} = req.body;
  await AccountService.clearFriendsList(id);
  res.status(200).json();
}

exports.getPendingController = async(req, res) => {
  const{id} = req.body;
  const pending = await AccountService.getPendingList(id);
  res.status(200).json({pending: pending});
}
//#endregion