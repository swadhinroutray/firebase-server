const admin = require('firebase-admin'),
    express = require('express'),
    router = express.Router(),
    db = admin.firestore();

module.exports = router;