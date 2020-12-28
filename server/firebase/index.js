
const admin = require("firebase-admin");

const serviceAccount = require("../config/fbConfigAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

module.exports = admin;
