const mongoose = require('mongoose')


const ShoppingcartSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        autopopulate: {
            maxDepth: 1
        },
        required: true
    },
    items: []

})


ShoppingcartSchema.plugin(require('mongoose-autopopulate'))

const ShoppingcartModel = mongoose.model('User', ShoppingcartSchema)
module.exports = ShoppingcartModel