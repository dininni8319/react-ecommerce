const admin = require('../firebase');

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