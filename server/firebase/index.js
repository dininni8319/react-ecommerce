var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");
// firebase admin tool to validet the token
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommerce-b78e8.firebaseio.com',
});

module.exports = admin;
