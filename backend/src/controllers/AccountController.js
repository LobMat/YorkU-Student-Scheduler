
const AccountService = require('../services/AccountService')


// control registration route
exports.registerController = async(req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const { acc, err } = await AccountService.registerAccount(username, email, password, confirmPassword);
    if (acc != null) {
     res.status(200).json({ success: true, err: err});
     } else {
       res.status(400).json({ success: false, err: err })
    }
}