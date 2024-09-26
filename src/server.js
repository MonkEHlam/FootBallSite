const sqlmanager = require("./js/db-manager");
const hbs = require("handlebars")
const express = require("express");
const expressHbs = require("express-handlebars")
const schedule = require("node-schedule");
const { Op } = require("sequelize");
const { monthInRusRod } = require("../constants");

const app = express();

const cleaning = schedule.scheduleJob({hour:0, minute:0},  () =>
    sqlmanager.CleanOldData()
)

const creating = schedule.scheduleJob({hour:0, minute:0}, () =>
    sqlmanager.CreateNewRentDay()
)

const urlencodedParser = express.urlencoded({extended: false});

hbs.registerHelper("createRentColumn", function(){
    let thisDate = this[0].date.slice(-2)[0] !== 0 ? this[0].date.slice(-2) : this[0].date.slice(-1)
    let thisMonth = this[0].date.slice(-5, -3)
    let cells = ""
    
    for(let i = 0; i < this.length; i += 3){
        const rentHour = [this[i], this[i+1], this[i+2]].sort((a, b) => a.areaID - b.areaID).map(item =>
            `<div itemid="${item.areaID}" class="column notification has-text-centered is-unselectable"${item.isAvailable ? "" : " disabeled"}>${item.time.slice(0, 5)}</div>`)
        cells += `
        <div class="columns is-gap-1 mb-0 is-mobile">
            ${rentHour.join("\n")}
            <span>
        </div>
        `
    }

    let htmlString = 
        `<div id="day${thisDate}" class="day column is-gap-4">
          <p class="has-text-centered mb-6">${thisDate + " " + monthInRusRod[thisMonth]}</p>
              ${cells}
        </div>`
    return new hbs.SafeString(htmlString)
})

sqlmanager.CreateNewRentDay()
app.use(express.json());
app.set("view engine", "hbs")
app.set("views", __dirname + "/static/views")
app.use(express.static(__dirname + "/static/"));

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
        order: ["date", "time"],
        where:{
            date:{
                [Op.gte]: new Date()
            }
        }
        }).then(res => {
            if (res){
                var rentDays = []
                res.forEach(rent => {
                    let date = rent.date.slice(-2)[0] !== 0 ? rent.date.slice(-2) : rent.date.slice(-1)
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
                rentDays: rentDays.sort((a,b)=>a.date-b.date)
        }
    )}).catch(err =>{
        console.log(err)
        response.sendStatus(500)
    })
})

app.post("/rent", urlencodedParser, function(request, response){
    console.log(request)
    response.render("rents")
})

app.listen("3000", () => console.log("Server started on port 3000"))

