const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.get("/",function(req,resp){
    resp.render("test");
});

router.post("/",function(req,resp){
   resp.send('{"username":"SAMUDRALA+ARAVIND","password":"NIT WARANGAL","email":"samudralaaravind1708@gmail.com"}');
});
router.post("/:id",(req,resp)=>{
    resp.send("Message");
});

router.get("/:mobile",function(req,resp){
    resp.send(`review of ${req.params.mobile}`);
});

router.get("/:email",function(req,resp){
    resp.send(`review of email ${req.params.email}`);
});

module.exports = router;