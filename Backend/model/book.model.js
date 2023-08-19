
const mongoose = require('mongoose')

const bookShecma = mongoose.Schema({
    Title : { type : String, required : true },
    Author : { type : String, required : true },
    Genre : { type : String, enum : ["Fiction", "Science", "Comic"] ,required : true },
    Description : { type : String, required : true },
    Price : { type : Number, required : true },
}, {
    versionKey : false
})

const BookModel = mongoose.model('book', bookShecma);

module.exports = {
    BookModel
}