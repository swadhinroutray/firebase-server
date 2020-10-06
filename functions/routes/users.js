/* eslint-disable promise/no-nesting */
/* eslint-disable callback-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
const admin = require('firebase-admin'),
    express = require('express'),
    firebase = require('firebase');
(router = express.Router()), (db = admin.firestore());

function isLoggedIn(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
        next();
    } else {
        res.send('notLoggedIn');
    }
}
router.get('/home', async(req, res) => {
    try {
        await db
            .collection('users')
            .get()
            .then(snapshot => {
                return res.send(snapshot.docs);
            });
    } catch (err) {
        console.log(err);
    }
    snapshot => {
        res.send(snapshot.docs);
    };
});
router.get('/all', isLoggedIn, async(req, res) => {
    let data = [];
    try {
        if (req.query.id) {
            var userID = req.query.id;
            try {
                db.collection('users')
                    .doc(userID)
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
                    .collection('users')
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

router.post('/register', async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async() => {
                try {
                    await db
                        .collection('users')
                        .add({
                            name: username,
                            email: email
                        })
                        .then(doc => {
                            return console.log('Created:', doc.id); // eslint-disable-next-line handle-callback-err
                        });
                } catch (err) {
                    console.log(err);
                }
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


router.post('/login', async(req, res) => {
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(user => {
                res.send('login success');
            });
    } catch (err) {
        res.send('wrond credentials');
    }
});



router.post('/logout', async(req, res) => {
    try {
        await firebase
            .auth()
            .signOut()
            .then(() => {
                res.send('signed out successfully');
            });
    } catch (err) {
        res.send('failed to logout');
    }
});

router.get('/currentUserAuth', (req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
        res.send({ user: user });
    } else {
        res.send('notLoggedIn');
    }
})

router.get('/currentUser', async(req, res) => {
    let data = [];
    try {
        const user = firebase.auth().currentUser;
        if (user) {
            await db
                .collection('users')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        data.push(doc.data());
                    });
                });
            data = data.filter(EachUser => EachUser.email === user.email)
            res.send(data)
        } else {
            res.send('notLoggedIn');
        }
    } catch (e) {
        console.log(e)
        res.send('something went wrong')
    }
})
router.delete('/remove', isLoggedIn, async(req, res) => {
    try {
        var userID = req.query.id;
        await db
            .collection('users')
            .doc(userID)
            .delete()
            .then(doc => {
                res.send('Document Deleted!');
            });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;