"use strict";

const express = require("express");
require('dotenv').config()
const fs = require("fs");
const http = require("http");
const https = require("https");
const cors = require("cors");
const app = express();

let port = process.env.SERVER_PORT || 8000;
let otaport = process.env.OTA_SERVER_PORT || 8001;
let serverIp = "0.0.0.0"

var privateKey = fs.readFileSync( 'privkey.pem' );
var certificate = fs.readFileSync( 'privcert.pem' );

app.set("view engine", "ejs");
app.use("/", express.static('site'))
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies using query-string library

app.post("/sessions",(req,res)=>{
  res.end('{"session":{"session_token":"2vMhFgktH3Jrbemm2WHkfGN","user_id":"2gsE4HbQ8UCBpYqurDgsafX","scope":"user","time_created":"2022-11-26T21:04:03.952175849Z","time_expires":"2123-11-26T21:04:03.952158558Z"},"user":{"user_id":"2gsE4HbQ8UCBpYqurDgsafX","drive_guest_id":"11ec68ca-1d4c-4e45-b1a2-715fd5e0abf9","player_id":"11ec68ca-1d4c-4e45-b1a2-715fd5e0abf9","created_by_app_name":"chewie","created_by_app_version":"1.0.2","created_by_app_platform":"android 8.0.0; samsung SM-G930U","dob":"2000-03-30","email":"whyyoulittle333@gmail.com","family_name":null,"gender":null,"given_name":null,"username":"whyyoulittle333@gmail.com","email_is_verified":true,"email_failure_code":null,"email_lang":"en-US","password_is_complex":true,"status":"active","time_created":"2018-10-21T05:06:41Z","deactivation_reason":null,"purge_reason":null,"email_is_blocked":false,"no_autodelete":false,"is_email_account":true}}');
})

function handleError(err){
  switch (err.code) {
    case "EADDRNOTAVAIL":
      console.log(`Unable to bind to IP ${serverIp} on this device`);
      return;
    case "EACCES":
      console.log(
        `Permission denied to bind to IP ${serverIp} on PORT ${port} on this device.`
      );
      return;
    case "EADDRINUSE":
      console.log(
        `Permission denied to bind to IP ${serverIp} on PORT ${port} on this device. The address is already in use.`
      );
      return;
    default:
      console.log(err);
      return;
  }
}

http.createServer(app).listen(port, serverIp, () => {
  console.log(`Server running on port ${port}`);
}).on("error", (err) => {
  handleError(err);
});


// https.createServer({
//   key: privateKey,
//   cert: certificate
// }, app).listen(port, serverIp, () => {
//   console.log(`Server running on port ${port}`);
// }).on("error", (err) => {
//   handleError(err);
// });

//This is used to serve the non http ota files
app.listen(otaport, serverIp, () => {
  console.log(`OTA Server running on port ${otaport}`);
}).on("error", (err) => {
  handleError(err);
});