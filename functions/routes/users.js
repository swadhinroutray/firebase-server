const admin = require('firebase-admin'),
    express = require("express"),
    router = express.Router(),
    db = admin.firestore();

router.get('/home', async(req, res) => {
    try {
        await db
            .collection('users')
            .get()
            .then(snapshot => {
                res.send(snapshot.docs);
            });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;