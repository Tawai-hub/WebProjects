const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    let day = date.getDate();
    
    res.render("list", {listTitle:day, newListItems:items})
});

app.post("/", (req, res) => {
    // console.log(req.body);
    let item = req.body.newItem;
    if(req.body.list === " Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
   
});

app.get("/work", (req,res) => {
    res.render("list", {listTitle:"Work List", newListItems:workItems});
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});