const functions = require('firebase-functions');

const express = require('express');
var path = require('path');
var site_root = path.resolve(__dirname + '/..');

var admin = require('firebase-admin');

var serviceAccount = require(site_root + '/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://hotweb-43048.firebaseio.com'
});

const app = express();
app.use(express.json());
app.get('/home', async(req, res) => {
    try {
        await admin
            .firestore()
            .collection('users')
            .get()
            .then(snapshot => {
                res.send(snapshot.docs);
            });
    } catch (err) {
        console.log(err);
    }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.app = functions.https.onRequest(app);