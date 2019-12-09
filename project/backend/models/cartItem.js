const mongoose = require('mongoose')


const cartItemSchema = mongoose.Schema({
    food: [],
    price: [],
    quantity: []

})


cartItemSchema.plugin(require('mongoose-autopopulate'))

const cartItemModel = mongoose.model('User', cartItemSchema)
module.exports = cartItemModel