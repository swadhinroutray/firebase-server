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
router.get('/all',async(req,res)=>{
 try{
    let data=[];
    await db
    .collection("users")
    .get()
    .then(snapshot=> {
        snapshot.docs.forEach((doc) => {
            data.push(doc.data());
        });
    })
    res.send(data);
}   
    catch(err) {
        console.log("Error getting documents: ", err);
    }
    
})
        

router.post('/save', async(req, res)=>{
    var username = req.body.username;
    var email = req.body.email;
    try{
    await db
    .collection('users')
    .add({
        name: username,
        email:email 
    })
    .then(doc=>{
       return console.log("Created:",doc.id);    // eslint-disable-next-line handle-callback-err
    })
}
    catch(err){
        console.log(err);
    }
});
router.get('/:id',async(req,res)=>{
        var userID = req.params.id;
      try{
        await db
        .collection('users')
        .doc(userID)
        .get()
        .then(doc=>{
            res.send(doc.data());
        })
    }
    catch(err){
        console.log(err);
    }
})
router.delete('/remove/:id',async(req,res)=>{
    var userID = req.params('id');
    try{
        await db
        .collection('users')
        .doc(userID)
        .delete()
        .then(doc=>{
            res.json("Deleted with id:",doc.id);
        })
    }
    catch(err){
        console.log(err);
    }
})
module.exports = router;
