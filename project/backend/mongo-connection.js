const mongoose = require('mongoose')

async function main(){
    await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/onlinefoodservice', 
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('mongoose connected')
        .catch(err => {
            console.log(Error, err.message);
        })
    
}

main()
