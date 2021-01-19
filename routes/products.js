const express = require('express');
const router = express.Router();
router.get("/",function(req,resp){
    resp.render("signup");
});
router.put("/:id",function(req,resp){
      resp.send(`This is is to add a new products with id ${req.params.id}`);
});
router.delete("/:id",function(req,resp){
    resp.send(`This is to delete a product with id ${req.params.is}`);
});
router.post("/",function(req,resp){
    resp.send("This is a post request to add a new product to database");
});


module.exports = router;
