const productConstants = Object.freeze({
    rentableAreas: 3,
    futureRentDays: 7,
    stadiumRentOpening: 9,
    stadiumRentCloses: 21,
})

const serverConstants = Object.freeze({
    rentSavingDays: 7
})

const monthInRusRod = {
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
    "12": "декабря"
}


module.exports = {
    productConstants,
    serverConstants,
    monthInRusRod
}