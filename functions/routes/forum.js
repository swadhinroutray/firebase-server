const admin = require('firebase-admin'),
    express = require('express'),
    router = express.Router(),
    db = admin.firestore();

router.get('/all', async(req, res) => {
    let data = [];
    try {
        if (req.query.id) {
            var forumID = req.query.id;
            try {
                db.collection('forum')
                    .doc(forumID)
                    .get()
                    .then(doc => {
                        res.send(doc.data());
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await db
                    .collection('forum')
                    .get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            data.push(doc.data());
                        });
                    });
                res.send(data);
            } catch (err) {
                console.log('Error getting documents: ', err);
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.delete('/remove', async(req, res) => {
    try {
        var forumID = req.query.id;
        await db
            .collection('forum')
            .doc(forumID)
            .delete()
            .then(doc => {
                res.send('Document Deleted!');
            });
    } catch (err) {
        console.log(err);
    }
});
router.delete('/remove', async(req, res) => {
    try {
        var forumID = req.query.id;
        await db
            .collection('forum')
            .doc(forumID)
            .delete()
            .then(doc => {
                res.send('Document Deleted!');
            });
    } catch (err) {
        console.log(err);
    }
});
router.put('/removeComment', async(req, res) => {
    try {
        var commentID = req.query.commentid;
        var postID = req.query.postid;
        var newComments;
        await db
            .collection('forum')
            .doc(postID)
            .get()
            .then(doc => {
                data = doc.data();
                newComments = data.comments.filter(
                    comment => comment.commentId != commentID
                );
            });
        await db
            .collection('forum')
            .doc(postID)
            .update({
                comments: newComments
            })
            .then(doc => {
                res.send('Document Deleted!');
            });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;