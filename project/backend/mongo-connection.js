const mongoose = require('mongoose')

async function main(){
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/onlinefoodservice', 
            { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('mongoose connected')
    } catch (error) {
        console.log('mongoose is NOT connected')
        handleError(error)
    }
}

main()
