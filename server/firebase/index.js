
const admin = require("firebase-admin");

const serviceAccount = require("../config/fbConfigAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://collegeportal-8abc7-default-rtdb.firebaseio.com"
});

module.exports = admin;
