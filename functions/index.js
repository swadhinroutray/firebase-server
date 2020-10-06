const functions = require("firebase-functions");
const express = require("express");
const firebase = require("firebase");
var path = require("path");
require("dotenv").config({ path: path.resolve("../.env") });
var site_root = path.join(__dirname, "/..");
var bodyParser = require("body-parser");
var admin = require("firebase-admin");

var serviceAccount = require(site_root + "/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});
firebase.initializeApp({
  apiKey:process.env.APIKEY,
  authDomain:process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
});
firebase;
const userRoutes = require("./routes/users");
const forumRoutes = require("./routes/forum");
const app = express();
const db = admin.firestore();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/forum", forumRoutes);


exports.app = functions.https.onRequest(app);
