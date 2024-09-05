const sqlmanager = require("./js/db-manager");
const hbs = require("hbs")
const express = require("express");
const expressHbs = require("express-handlebars")

const app = express();

app.set("view-engine", "hbs")
app.set("views", __dirname + "/static/views")

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "app/static/views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.use("/", function(_, response){
       
    response.render("home.hbs");
});

app.listen("3000")