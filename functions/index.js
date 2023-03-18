const functions = require("firebase-functions");
const myApp = require("../config/server"); // Causes Error (can't find file)

const admin = require("firebase-admin");
admin.initializeApp();


exports.family = functions.https.onRequest(myApp);
