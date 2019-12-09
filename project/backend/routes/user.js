const express = require('express')
const router = express.Router()
const moment = require('moment')

const RestaurantService = require('../services/restaurant-service')
const UserService = require('../services/user-service')
const OrderService = require('../services/order-service')
const FoodService = require('../services/food-service')
const ReviewService = require('../services/review-service.js')

let status = 500  // 406 - Not acceptable

router.get('/all', async(req, res) => {
    var users = await UserService.findAll()
    res.render(__dirname + '/../views/list', { items : users })
})

router.get('/all/json', async (req, res) => {
    const users = await UserService.findAll()
    res.send(users)
  })

  //login user
router.post('/login/json', async(req, res) => {
    const user = await UserService.findByParameter(req.body)
    console.log(user)
    res.send(user)
})

router.get('/:id', async(req, res) => {
    const user = await UserService.find(req.params.id)
    if (!user) {
        res.status(404)
        res.render(__dirname + '/../views/nofound')
    }
    else res.render(__dirname + '/../views/user', { user : user, orders: user.orders })
})

router.get('/:id/json', async (req, res) => {
    const user = await UserService.find(req.params.id)
    if (!user) res.status(404)
    res.send(user)
  })

//get list of restaurants located near user (search by index)
router.get('/:id/restaurants', async(req, res) => {
    const userId = req.params.id
    try{
        const user = await UserService.find(userId)
        if (!user) {
            const er = new Error('No user with id : ' + userId)
            status = 404
            throw er
        }
        status = 500
        const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(user.index)
        res.render(__dirname + '/../views/list', { items : restaurant })
    } catch(err) {
        res.status(status).send(err.message)
    }  
})

router.get('/:id/restaurants/json', async(req, res) => {
    const userId = req.params.id
    try{
        const user = await UserService.find(userId)
        if (!user) {
            const er = new Error('No user with id : ' + userId)
            status = 404
            throw er
        }
        status = 500
        const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(user.index)
        res.send(restaurant)
    } catch(err) {
        res.status(status).send(err.message)
    }  
})

//http://localhost:3000/user/5dd1412c51db4776931cd848/restaurants

//get list of reviews for user
router.get('/:id/reviews', async(req, res) => {
    try{
        const object = await UserService.find(req.params.id)
        if (!object) {
            const er = new Error('No user with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const reviews = await ReviewService.getAllReviews(req.params.id, 'user', UserService)
        res.render(__dirname + '/../views/review', { object : object, reviews : reviews, moment: moment  })
    } catch(err) {
        res.status(status).send(err.message)
    }
})

// /user/5dd1412c51db4776931cd848/reviews
router.get('/:id/reviews/json', async(req, res) => {
    try{
        const object = await UserService.find(req.params.id)
        if (!object) {
            const er = new Error('No user with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const reviews = await ReviewService.getAllReviews(req.params.id, 'user', UserService)
        res.send(reviews) 
    } catch(err) {
        res.status(status).send(err.message)
    }
})



//axios.post('/user', {name:'Elsa', index: 10245}).then(console.log)
router.post('/', async(req, res) => {
    const user = await UserService.add(req.body)
    res.send(user)
})

//make review to restaurant
router.post('/:userId/restaurant/:restId/review/json', async(req, res) => {
    const { userId, restId } = req.params
    try{
        const user = await UserService.find(userId)
        const rest = await RestaurantService.find(restId)
        const review = req.body
        if(!user || !rest){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500
        const reviewFinal = await ReviewService.createReview(rest, user, review)

        const rating = (rest.rating * rest.reviews.length + review.rating)/(rest.reviews.length + 1)
        await RestaurantService.update(rest.id, 
                                        {
                                            $push: {reviews: reviewFinal}, 
                                            $set:  {rating: rating}
                                        })
        await UserService.update(user.id, {$push: {reviews: reviewFinal}})
        
        res.send(reviewFinal)
    }catch(err) {
        res.status(status).send(err.message)
    }
    
})

//axios.post('/user/5dd1412c51db4776931cd848/restaurant/5dd1958034c8327e643e011a/review',{name: 'cool'}).then(console.log)

//user makes an order in specific restaurant
router.post("/:userId/restaurant/:restId/order/json", async (req, res) => {
    const { userId, restId } = req.params;
  
    try {
        const user = await UserService.find(userId);
        const rest = await RestaurantService.find(restId);

        if(!user || !rest){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500

        //extract food, foodPrice, foodQuantity from req.body.shoppingcart
        //get foodIds

        const food = await FoodService.getFoodArrayByIds(req.body.shoppingcart.map(x => x.food))
        const foodPrice = req.body.shoppingcart.map(x => x.price)
        const foodQuantity = req.body.shoppingcart.map(x => x.quantity)

        //extract orderPrice from req.body.orderPrice
        const orderPrice = req.body.orderPrice
        const order = await OrderService.createNewOrder(user, rest, food, foodPrice, foodQuantity, orderPrice)
        res.send(order);
    } catch (err) {
        res.status(status).send(err.message)
    }
  });

// axios.post('/user/5dd1412051db4776931cd847/restaurant/5dd1413751db4776931cd849/order',{
//             food: ['5dd1414251db4776931cd84c']
//         }).then(console.log)


//axios.post('/user/5dd1412051db4776931cd847', {address: 'CVC'}).then(console.log)

//get list of orders for usr
router.post("/:userId/orders/json", async (req, res) => {
    try {
        const user = await UserService.find(req.params.userId);

        if(!user){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500
        const orders = await OrderService.getAllOrdersForUser(req.params.userId)
        res.send(orders);
    } catch (err) {
        res.status(status).send(err.message)
    }
})

//user cancel an order 
router.post("/:userId/order/:orderId/cancel", async (req, res) => {
    const { userId, orderId } = req.params;
  
    try {
        const user = await UserService.find(userId);
        const order = await OrderService.find(orderId);

        if(!user || !orderId){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500
        await OrderService.cancellOrder(order);
        res.send(order);
    } catch (err) {
        res.status(status).send(err.message)
    }
  });

// axios.post('/user/5ddfc5c47a553c056aad877d/order/5ddfc5c47a553c056aad878d/cancel').then(console.log)

//add restaurant to favorites
router.post('/:userId/restaurant-add-to-fav/:restId/json', async(req, res) => {
    const { userId, restId } = req.params;
  
    try {
        let user = await UserService.find(userId);
        const rest = await RestaurantService.find(restId);

        if(!user || !rest){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500

        //check if restaurant is in favorites already
        const index = user.favoriteRestaurants.findIndex(x => x.id === restId);
        if (index == -1){
           await UserService.update(user.id, {$push: {favoriteRestaurants: restId}})
        }else{
            //delete from favorite
            await UserService.update(user.id, {$pull: {favoriteRestaurants: restId}})
        }

        //extract user again
        user = await UserService.find(userId);
        
        res.send(user);
    } catch (err) {
        res.status(status).send(err.message)
    }
})


//update user's details
router.post('/:id/update/json', async(req, res) => {
    await UserService.update(req.params.id, req.body)
    const user = await UserService.find(userId);
    res.send(user)
})



router.delete('/:id', async(req, res) => {
    const user = await UserService.del(req.params.id)
    res.send(user)
})

// router.delete('/all', async(req, res) => {
//     await UserService.delAll()
//     res.send('all users were deleted')
// })


module.exports = router