const express = require('express');
const router = express.Router();
router.get("/",function(req,resp){
    resp.send("This is 'orders/'-->get request");
});
router.post("/",function(req,resp){
    resp.send("This is 'orders/'-->get request");
});
router.get("/:id",(req,resp)=>{
    resp.send(`the id that you given is: ${req.params.id}`);
});







module.exports = router;