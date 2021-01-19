const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const orders = require("routes/orders");
const orders = require("./routes/orders");

const customers = require("./routes/customers");

const products = require("./routes/products");

const leads  = require("./routes/leads");

app.use("/leads",leads);

app.use("/products",products);

app.use("/customers",customers);

app.use("/orders",orders);

var port = process.env.port  || 8080;
app.set("views","views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

app.get("/",function(req,resp){
    resp.send("This is home page");
});

// app.get("/",function(req,resp){
//     resp.render("test");
// });
// app.get("/signup",function(req,resp){
//     resp.render("signup");
// });

// app.post("/signup",function(req,resp){
//     resp.send(`You have submitted ${req.body.fullname} and ${req.body.email}`);
    
// });
