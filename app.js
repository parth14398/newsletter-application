const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"));
app.listen(process.env.PORT || 3000, function() {
  console.log("server started at port 3000");
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

})
app.post("/", function(req, res) {
  const lname = req.body.lname;
  const fname = req.body.fname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };
  const url = ;//your url from mailchimp
  const options = {
    method: "POST",
    auth: ; //authentication code from mailchimp server
  }

  const jsondata = JSON.stringify(data);
  const request = https.request(url, options, function(response) {
    if (response.statusCode==200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })

  });
  request.write(jsondata);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})
