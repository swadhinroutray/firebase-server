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
// router.get('/:id',(req,res)=>{
//     var userID = req.params.id;
//     var client  = db.collection('users').get(userID);
//     if(client){
//         res.json(client);
//     }
//     else{
//         res.send('Error getting Doc:', client);
//     }
// })
module.exports = router;