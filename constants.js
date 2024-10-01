const productConstants = Object.freeze({
    rentableAreas: 3,
    futureRentDays: 7,
    stadiumRentOpening: 9,
    stadiumRentCloses: 21,
})

const serverConstants = Object.freeze({
    rentSavingDays: 7
})

const monthInRusRod = Object.freeze({
    "01": "января",
    "02": "февраля",
    "03": "марта",
    "04": "апреля",
    "05": "мая",
    "06": "июня",
    "07": "июля",
    "08": "августа",
    "09": "сентября",
    "10": "октября",
    "11": "ноября",
    "12": "декабря",
    "января": "0",
    "февраля": "1",
    "марта": "2",
    "апреля": "3",
    "мая": "4",
    "июня": "5",
    "июля": "6",
    "августа": "7",
    "сентября": "8",
    "октября": "9",
    "ноября": "10",
    "декабря": "11"
})


module.exports = {
    productConstants,
    serverConstants,
    monthInRusRod
}