const mongoose = require('mongoose')

async function main(){
    await mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/onlinefoodservice', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('mongoose connected')
}

main()
