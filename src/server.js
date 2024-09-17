const sqlmanager = require("./js/db-manager");
const hbs = require("handlebars")
const express = require("express");
const expressHbs = require("express-handlebars")
const schedule = require("node-schedule");
const { Op } = require("sequelize");
const { productConstants } = require("../constants");

const app = express();

const cleaning = schedule.scheduleJob({hour:0, minute:0},  () =>
    sqlmanager.CleanOldData()
)

const creating = schedule.scheduleJob({hour:0, minute:0}, () =>
    sqlmanager.CreateNewRentDay()
)

hbs.registerHelper("createTab", function(){
    let mydate = this[0].date.slice(-2)
    let isActive = new Date().getDate() == mydate ? 'class="is-active" ' : ""
    return new hbs.SafeString(`<li ${isActive}data-target="rentGrid${mydate}"><a>${mydate}</a></li>`)
})

hbs.registerHelper("createRentGrid", function(){
    let mydate = this[0].date.slice(-2)
    let cells = this.map(rent => 
        `<div class="cell"><button class="button">${rent.time.slice(0, 5)}</button></div>`
    )
    let htmlString =
        `<div class="px-2" id="tab_content">
            <div id="rentGrid${mydate}" class="fixed-grid has-3-cols${new Date().getDate() != mydate ? ' is-hidden" ' : ""}">
                <div class="grid">
                ${cells.join("\n\t\t")}
                </div>
            </div>
        </div>`
    return new hbs.SafeString(htmlString)
})
sqlmanager.CreateNewRentDay()
app.use(express.json());
app.set("view engine", "hbs")
app.set("views", __dirname + "/static/views")
app.use(express.static(__dirname + "/static/js/"));

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "src/static/views/layouts", 
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
    sqlmanager.Rent.findAll({
        raw: true,
        attributes: ["date", "time", "areaID", "isAvailable"], 
        order: ["time"], 
        }).then(res => {
            if (res){
                var rentDays = []
                res.forEach(rent => {
                    let date = rent.date.slice(-2)
                    if (!rentDays[date]){
                        rentDays[date] = []
                        rentDays[date].push(rent)
                    }
                    else{
                        rentDays[date].push(rent)
                    }
                });
            }
            response.render("rents", {
                title: "Аренда",
                rentDays: rentDays
        }
    )})
})
app.listen("3000", () => console.log("Server started on port 3000"))

