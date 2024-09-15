const sqlmanager = require("./js/db-manager");
const hbs = require("hbs")
const express = require("express");
const expressHbs = require("express-handlebars")
const schedule = require("node-schedule");
const { Op } = require("sequelize");

const app = express();

const cleaning = schedule.scheduleJob({hour:0, minute:0}, function(){
    sqlmanager.CleanOldData()
})

const creating = schedule.scheduleJob({hour:0, minute:0}, function(){
    sqlmanager.CreateNewRentDay()
})




app.use(express.json());
app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "src/views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
))

app.get("/", function(_, response){
       
    response.render("index",{
      title: "Главная страница"

    });
});

app.get("/rent", function(_, response){
    
    sqlmanager.Rent.findAll({raw: true, order: ["date"]}).then(res => {
    console.log(res)
    response.render("rents", {
        title: "Аренда",
        rents: res
    })})
})
app.listen("3000", () => console.log("Server started on port 3000"))