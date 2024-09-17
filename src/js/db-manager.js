const { Sequelize, DataTypes, Op } = require('sequelize')
const {DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD} = require("../../config")
const constants = require("../../constants")
// Create an instance of sequelize
const sequelize =
    new Sequelize(DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            initialAutoIncrement: false
        }        
    })

// Validate and connect to the database
sequelize.authenticate().then(
    () => console.log('Successfully connected to the database!')).catch(
        (error) => console.log('Failed to connect the database:', error));

const Tournament = sequelize.define("tournament",{
    code: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
    name:{
        type: DataTypes.STRING
    },
    quantityOfPeople:{
        type: DataTypes.INTEGER
    }
})

const Rent = sequelize.define("rent", {
    code: 
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    date:
    {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: 
    {
        type: DataTypes.TIME,
        allowNull: false
    },
    areaID:
    {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    isAvailable:{
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
})

const Client = sequelize.define("client", {
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    servicetype: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    servicecode:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
}) 

Tournament.hasMany(Client)
Client.hasMany(Rent)
Rent.hasOne(Client)


// Rent.sync({alter:true}).catch(err => console.log(err))
console.log('The table for models was just (re)created!');

// Rents

async function CleanOldData(){
    let condition = {where:{
        data:{
        [Op.lt]: new Date(new Date() - constants.serverConstants.rentSavingDays * 24 * 60 * 60 * 1000) 
    }
    }}
    Rent.destroy(condition)
    Tournament.destroy(condition)
}

async function CreateNewRentDay() {
    try{
    let newDay = new Date(
        new Date() + constants.productConstants.futureRentDays * 24 * 60 * 60 * 1000
    )
    for (
        let rentHour = 1; 
        rentHour <= constants.productConstants.stadiumRentCloses - constants.productConstants.stadiumRentOpening; 
        rentHour++){
        for (let rentArea = 1; rentArea <= constants.productConstants.rentableAreas; rentArea++){
            let newTime = `${9 + rentHour}:00`;
            Rent.findOne({where:{
                [Op.and]: [{date:newDay}, {time: newTime}]}})
                .then(exists =>{
                    if (!exists){
                        Rent.create({date: newDay, time: newTime, areaID: rentArea})}})
        }
        }
        }
        catch(err){
            console.log(err)
        }
}

module.exports = 
{
    Rent,
    Client,
    Tournament,
    CleanOldData,
    CreateNewRentDay,
};