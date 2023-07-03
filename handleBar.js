const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const dotenv = require("dotenv");
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const schedule = require("node-schedule")



var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service:'gmail',
    secure: true,
    auth: {
      user: 'sammish9825@gmail.com',
      pass: 'logiqbqawysrfhez',
    },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve('./view'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./view'),
  extName: ".handlebars",
}

transporter.use('compile', hbs(handlebarOptions));

var mailOptions = {
  from: 'sammish9825@gmail.com',
  to: "mishrasejal307@gmail.com",
  subject: 'Sending Email using Node.js',
  template: 'email',
  context: {
   name: 'Mishra',
   company: 'EWW',
   paragraph : "lorem sjdhuh djhfuef ",

  }

};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.json(info)
  }
});

schedule.scheduleJob("*/10 * * * * *" , () => (
  console.log("server is scheduled")
))

