const app = require('./app')
const port = 3000

app.listen(process.env.PORT || 3000, () =>{
  console.log('server is listening')
})


//http://localhost:3000/restaurant/5ddbf0c6359b32248669e20e/reviews