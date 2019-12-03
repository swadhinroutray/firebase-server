const functions = require('firebase-functions');

const express = require('express');
var path = require('path');
var site_root = path.resolve(__dirname + '/..');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');

var serviceAccount = require(site_root + '/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://hotweb-43048.firebaseio.com'
});
const userRoutes = require('./routes/users')
const app = express();
const db = admin.firestore()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoutes)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.app = functions.https.onRequest(app);