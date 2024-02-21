// first step is to add the boiler-plate code
const express = require("express");
const bodyParser = require("body-parser");
// the date functionality is exported to an external module using ejs
const date = require(__dirname + "/date.js");
const app = express();

// create place-holders to hold the items to be displayed
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

// body-parser is to read the content submitted in the document
app.use(bodyParser.urlencoded({extended: true}));
// this allows the ejs to add static css files and images
app.use(express.static("public"));
// this part is required to use ejs functionality
app.set('view engine', 'ejs');

// this is the response the server gives back when the user searches the website
app.get("/", (req, res) => {
    // get the current date 
    let day = date.getDate();
    // the first arguement is the name of the main ejs file 
    //the second arguement is the variables being assigned
    res.render("list", {listTitle:day, newListItems:items})
});

// this the response when the user submits something
app.post("/", (req, res) => {
    // console.log(req.body);
    // save the submitted values in a variable
    let item = req.body.newItem;
    if(req.body.list === " Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
   
});

// this is similar to the default route with a slight difference in heading and content
app.get("/work", (req,res) => {
    res.render("list", {listTitle:"Work List", newListItems:workItems});
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});