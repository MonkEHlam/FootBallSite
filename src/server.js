//const sqlmanager = require("./js/db-manager");
const hbs = require("hbs")
const express = require("express");
const expressHbs = require("express-handlebars")

const app = express();

app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "src/views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.use("/", function(_, response){
       
    response.render("index",{
      title: "Главная страница"

    });
});

app.listen("3000", () => console.log("Server started on port 3000"))