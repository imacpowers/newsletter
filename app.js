//const functions = require('firebase-functions');
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require('https');

//firebase stuff
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: "AIzaSyBWEn0kueTq0ypHTZ-ac6cvcMlFt99-30Q",
//   authDomain: "q-newsletter.firebaseapp.com",
//   projectId: "q-newsletter",
//   storageBucket: "q-newsletter.appspot.com",
//   messagingSenderId: "610042290593",
//   appId: "1:610042290593:web:38a7a3f03bcb6fad7e6be0",
//   measurementId: "G-78V49VMC0Q"
// };
// const app1 = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app1);
//firebase end.

//const JsonData = JSON.stringify();

const URL = require('url').URL;
const url = "https://us17.api.mailChimp.com/3.0/lists/9ae240b3cb";
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
var Firstname=req.body.fname;
var Lastname=req.body.lname;
var Email=req.body.email;
const data = {
  members:[
    {
      email_address: Email,
    status: "subscribed",
  merge_fields: {
    Fname: Firstname,
    Lname: Lastname
  }    }
  ]
};
const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailChimp.com/3.0/lists/9ae240b3cb";
//https.request(url, options, function(response){

//});
console.log(Firstname,Lastname, Email);

const options = {
  method: "POST",
  auth: "imperial2:143d72ddd68f9764267b40072c7deab9-us17"

};
const requ = https.request(url, options, function(response){
if (response.statusCode ===200){
  res.sendFile(__dirname + "/success.html");
}else {
  res.sendFile(__dirname + "/failure.html");
}
  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});
requ.write(jsonData);
requ.end();
});
app.post("/", function(req, res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000, function(){
  console.log("server started on port 3000");
});
//exports.app = functions.https.onRequest(app);

//API KEYS

