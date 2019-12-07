const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    password: {
        type: String,
        default: '111'
    },
    address: String,
    index: {
        type: Number,
        required: true,
        minlength: 5
    },
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        autopopulate: {
            maxDepth: 1
        }
    }],
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Review',
        autopopulate: {
            maxDepth: 1
        }
    }],
    img: String,
    
    favoriteRestaurants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        autopopulate: {
        maxDepth: 1
        }
    }]
})

UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel


