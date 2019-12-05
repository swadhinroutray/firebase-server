const functions = require('firebase-functions');

const express = require('express');
const firebase = require('firebase');
var path = require('path');
var site_root = path.join(__dirname , '/..');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');

var serviceAccount = require(site_root + '/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://hotweb-43048.firebaseio.com'
});
firebase.initializeApp({
    apiKey: 'AIzaSyCnZcckMPdH5Gjw6HjiKJMXifaukx2378U',
    authDomain: 'hotweb-43048.firebaseapp.com',
    databaseURL: 'https://hotweb-43048.firebaseio.com',
    projectId: 'hotweb-43048',
    storageBucket: 'hotweb-43048.appspot.com',
    messagingSenderId: '373707440045',
    appId: '1:373707440045:web:20c562ab23be2b43fa2b24',
    measurementId: 'G-Q1R7XHYH3R'
});
firebase;
const userRoutes = require('./routes/users');
const forumRoutes = require('./routes/forum');
const app = express();
const db = admin.firestore();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.app = functions.https.onRequest(app);