const functions = require("firebase-functions");
const app = require("./config/app");

// const admin = require("firebase-admin");
// admin.initializeApp();


exports.familyFinal = functions.https.onRequest(app)