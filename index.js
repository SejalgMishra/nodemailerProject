const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config({ path: __dirname + "/.env" });
const schedule = require("node-schedule")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const user = process.env.USEREMAIL;

const nodemailer = require("nodemailer");
const Mail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "colten.sauer@ethereal.email",
      pass: "vQYEnffUjTQZKCSsAW",
    },
  });

  const handleBarOptions = {
    viewEngine: {
      extName: ".handlebar",
      partialsDir: path.resolve("./view"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./view"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handleBarOptions));

  let info = transporter.sendMail({
    from: '"Sejal mishra" <mishrasejal307@gmail.com>',
    to: "colten.sauer@ethereal.email",
    subject: "Hello to Sejal",
    context: {
      title: "heloo sejal",
      text: "Lorem ipsum dolor sit amet, consectetur...",
    },
    template: "email",
  });

  console.log("Message sent: %s", info.messageId);

  res.json(info);
  console.log(info);
};

// let testAccount = nodemailer.createTestAccount();

// let transporter = nodeMailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

// let info =  transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);

//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// transporter.sendMail(mailOptions, function (err, data) {
//   if (err) {
//     console.log("Error " + err.message);
//   } else {
//     console.log("Email sent successfully");
//   }
// });

app.get("/", Mail);

schedule.scheduleJob("* * * * * *" , () => (
  console.log("server is scheduled" , moment().format('dd mm yyyy hh:mm:ss'))
))

app.listen(3030, "localhost", () => {
  console.log(`server started for mailer on 3030 ${user}`);
});
