/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const admin = require('firebase-admin'),
    firebase = require('firebase'),
    express = require('express'),
    router = express.Router(),
    db = admin.firestore();
var uuidv4 = require('uuid/v4');
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
                    comment => comment.commentId !== commentID
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
router.post('/newArticle', async(req, res) => {
    var article = {
        articlename: req.body.articlename,
        author: req.body.author,
        content: req.body.content,
        hashtags: req.body.hashtags,
        visible: true,
        comments: []
    };
    try {
        await db
            .collection('forum')
            .add(article)
            .then(snapshot => {
                db.collection('forum')
                    .doc(snapshot.id)
                    .update({
                        timestamp: admin.firestore.FieldValue.serverTimestamp()
                    });
                console.log('added with id:', snapshot.id);

                return res.send('Added new Article!');
            });
    } catch (err) {
        console.log(err);
    }
});
router.put('/addcomment', async(req, res) => {
    try {
        var postID = req.query.postID;

        var newcomments;
        await db
            .collection('forum')
            .doc(postID)
            .get()
            .then(doc => {
                data = doc.data();
                newcomments = data.comments;

                db.collection('forum')
                    .doc(postID)
                    .update({
                        comments: admin.firestore.FieldValue.arrayUnion({
                            comment: req.body.comment,
                            commentid: uuidv4(),
                            createdAt: doc.readTime
                        })
                    })
                    .then(() => {
                        res.send('comment added');
                    });
            });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;