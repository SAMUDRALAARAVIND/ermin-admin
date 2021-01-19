const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require("mysql");
const axios = require("axios");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Indian@123",
    database:"ermin"
});
router.use(bodyParser.urlencoded({extended:true}));



router.get("/",function(req,resp){
   resp.render("customersignup");
});

//testing routes starts here





router.get("/videocall/",function(req,resp){
    resp.render("videocall");
});

router.post("/videocall", function(req,resp){
    console.log("request is In second satge");
    connection.connect();
    connection.query(`SELECT * FROM test;`,function(err,result,fields){
        resp.send(result);
        console.log(typeof(result));
        console.log(result[0]);
    });
});

//testing routes ends here
router.post("/",function(req,resp){

    var data = req.body;
    console.log(`compleate object is : ${JSON.stringify(data)}`)
    var errorArray = [];


    function validateUser(username){
        var regEx = /^[a-zA-Z-]+$/;
        if(!username.match(regEx)){
            errorArray.push("Username format is Invalid!");
        }

    }



    function validatePassword(password){
        var regEx =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(!password.match(regEx)){
            errorArray.push("A valid password should contain atleast one numeric value and atleast one special charecter with minimum length of 6 charecters and maximum length of 16 charecters without any spaces");
        }
    }


    function validateEmail(email){
        var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(regEx)){
            errorArray.push("Invalid email address!");
        }
    }


    function validatePincode(pincode){
        var error =true;
        axios.get("https://api.postalpincode.in/pincode/"+pincode).then(function(response){
            if(response.data[0].Status!=="Success")
                errorArray.push("Invalid pincode");
        });
    }


    function validateNumber(mobileNumber){
        var regEx = /^[0-9]+$/;
        if(!(/^\d{10}$/.test(mobileNumber)) || mobileNumber.length!==10)
            errorArray.push("Invalid mobile number");
        console.log(`mobile errors are: ${(/^\d{10}$/.test(mobileNumber))} and ${mobileNumber.length!==10} number is:${mobileNumber}`);
    }


    validateUser(data.username);
    validateEmail(data.email);
    validatePincode(data.pincode);
    validateNumber(data.mobileNumber);
    validatePassword(data.password);
    var func = function(){
        for(var i = 0;i<errorArray.length;i++){
            console.log(errorArray[i]);
        }
   }

   setTimeout(func,5000);

    if(errorArray.length ==0){
        connection.connect();
        var prevId = 100000;
        var sql = `INSERT INTO users(customerid,username,pass,landmark,email,pincode,mobile,address,city,state) 
        VALUES(${prevId},"${data.username}","${data.password}","${data.landmark}","${data.email}","${data.pincode}","${data.mobileNumber}","${data.address}","${data.city}","${data.state}");`;
        connection.query(sql,function(err,result){
        if(err) throw err;
        console.log("1 row effected successfully");
    });
    }
    else{
        var errorList = {
            errors:errorArray
        };
        errorList = JSON.stringify(errorList);
        resp.send(errorList);
    }







    // var formData = req.body;
    // connection.connect();
    // var sql = `INSERT INTO test(username,email,pincode,mobile,address,city,state) 
    // VALUES("${formData.username}","${formData.email}","${formData.pincode}","${formData.mobile}","${formData.address}","${formData.city}","${formData.state}");`;
    // connection.query(sql,function(err,result){
    //     if(err) throw err;
    //     console.log("1 row effected successfully");
    //     resp.render("welcome");
    // });
});








router.get("/:id",function(req,resp){
    resp.send(`this is id request using get request ${req.params.id}`);
});
router.get("/:email",function(req,resp){
    resp.send(`this is email request using get request ${req.params.email}`);
});
router.get("/:mobile",function(req,resp){
    resp.send(`this is mobile request using get request ${req.params.mobile}`);
});
router.post("/",function(req,resp){
    resp.send("This is a post request to add a user to database");
});

module.exports = router;
