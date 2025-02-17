
const { AccountService } = require('../services/AccountService')

exports.registerController = async(req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const { acc, err } = await AccountService.registerAccount(username, email, password, confirmPassword);
    if (acc != null) {
      res.redirect('/new-url');
     //res.status(200).json({ success: true});
     } else {
       res.status(400).json({ success: false, err })
    }
}