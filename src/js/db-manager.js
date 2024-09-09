const mysql = require("mysql2");

module.exports = {AddNewTournament,};

const codetypes = Object.freeze({
    TOURNAMENT: 1,
    RENT: 2,
})

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "football",
    password: "Qwadrat12543SQL"
});

connection.connect(function(err){
    if (err){
        console.log(err.message, err)
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено")
    }
});

function AddNewTournament(name, date, qtyOfPeople){
    connection.query("INSERT INTO tournaments(code, date, name, qauntityOfPeople) VALUES (?, ?, ?, ?)", [GenerateCode(codetypes.TOURNAMENT), date, name, qtyOfPeople], function(err){
        if (err) console.log(err.message);})}


function GenerateCode(codetype){
    let code
    switch (codetype){
        case codetypes.RENT:
            code = "R";
            break;
        case codetypes.TOURNAMENT:
            code = "T";
            break;
        default:
            throw new Error("Unknown codetype.");
    }
    let res
    do{
        code += `${Math.round(Math.random() * (999 - 100) + 100)}`;
        connection.query("SELECT 1 FROM tournaments WHERE code=?",code, function(err, result){
        if (err){
            console.log(err.message);
        }
        else{
            res = result
        }
    })}
    while(res)
    return code;
}