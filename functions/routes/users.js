/* eslint-disable promise/catch-or-return */
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
    let data=[];
    try{

        if(req.query.id){
        var userID = req.query.id;
        try{
            db
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
    }

    else{
  
      try{

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
    }
    }
    catch(err){
        console.log(err);
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

router.delete('/remove',async(req,res)=>{
    
    try{
        var userID = req.query.id;
        await db
        .collection('users')
        .doc(userID)
        .delete()
        .then(doc=>{
            res.send('Document Deleted!');
        })
    }
    catch(err){
        console.log(err);
    }
})
module.exports = router;
