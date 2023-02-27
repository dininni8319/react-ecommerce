const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers, "TESTING the auth");

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
    // console.log("FIREBASE USER IN AUTHCHECK",firebaseUser); //token
  } catch (error) {
      res.status(400).json({
        err: "Invalid or exiped token"
      });
  }
}

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: "Admin resource. Access denied."
    })
  } else {
    next()
  }
}