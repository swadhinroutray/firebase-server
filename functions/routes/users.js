/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
const admin = require('firebase-admin'),
    express = require("express"),
    router = express.Router(),
    db = admin.firestore();

router.get('/home', async(req, res) => {
    try {
        await db
            .collection('users')
            .get()
            .then(snapshot =>{
                
               return res.send(snapshot.docs);
            });
    } catch (err) {
        console.log(err);
    }snapshot =>{
        res.send(snapshot.docs);
    }
});
router.get('/all',(req,res)=>{
    // output = db.collection('users').get().then((doc)=>{
    //     doc.forEach((docs)=>{
    //         res.send(docs.data());
    //     });
    // }).catch((err)=>{
    //     console.log(err);
    // });
    var userRef = db.collection("users")
    var allUsers = userRef.get()
    .then(snapshot=> {
        snapshot.forEach((doc) => {
            res.json(doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
})
        

router.post('/save', (req, res)=>{
    var username = req.body.username;
    var email = req.body.email;
    let data={
        name: username,
        email:email
        
    }
    let setDoc  = db.collection('users').doc('id2').set(data);
    return setDoc.then(res=>{
        console.log('set:', res);
    })
})
module.exports = router;