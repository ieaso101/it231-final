var bodyParser = require("body-parser");

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  layouts = require("express-ejs-layouts");
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

var jsonParser = bodyParser.json();
// for parsing application/json 
app.use(bodyParser.json());
// for parsing application/xwww- 
app.use(bodyParser.urlencoded({ extended: true }))

  mongoose.connect(
    "mongodb+srv://isaiah:isaiah@it231-usoq8.azure.mongodb.net/final_project?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  mongoose.set("useCreateIndex", true);
  const db = mongoose.connection;

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://isaiah:isaiah@it231-usoq8.azure.mongodb.net/final_project?retryWrites=true&w=majority";

  db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
  });


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => 
  {
    res.render("subscribers", { subscribers: req.data});
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/", homeController.index);
app.get("/interviews", homeController.interviews);
app.get("/vlogs", homeController.vlogs);
app.get("/client-testimonials", homeController.client_testimonials);
app.get("/educational-content", homeController.educational_content);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/thanks",homeController.thanks);
app.get("/contact", homeController.contact);

app.post("/subscribe", function(req,res){
  console.log(req.body)
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("final_project");
    var myobj = { name: req.body.name, email: req.body.email };
    dbo.collection("subscribers").insertOne(myobj, function(err, res) {
    if (err) throw err;
      console.log("1 record added");
      db.close();
    });
    return res.redirect('/thanks');
    db.close();
  });
});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
}); 
