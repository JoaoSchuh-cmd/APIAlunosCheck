const mongoose = require('mongoose')

const Student = mongoose.model('Student', {
    name : String,
    cellphoneNumber : String,
    active : Boolean,
}) 

module.exports = Student