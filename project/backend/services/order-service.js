const BaseService = require('./base-service')
const OrderModel = require('../models/order')
const Enums = require('../helpers/enums')


class OrderService extends BaseService {
    model = OrderModel

    async createNewOrder(user, restaurant, food, foodPrice, foodQuantity, orderPrice) {
        const order = await this.add({user: user, 
                                    restaurant: restaurant, 
                                    food: food, 
                                    status: Enums.OrderStatus.OPEN,
                                    orderNumber: Math.floor(100000 + Math.random() * 900000),
                                    date: new Date().toLocaleString(),
                                    foodPrice: foodPrice,
                                    foodQuantity: foodQuantity,
                                    orderPrice: orderPrice
                                })
        user.orders.push(order._id)
        restaurant.orders.push(order._id)
        restaurant.visitors.push(user._id)
        await user.save()
        await restaurant.save()
        return order
    }

    async cancellOrder(order) {
        order.status = Enums.OrderStatus.CANCELLED
        await order.save()
        return order
    }

    async getOrdersByStatus(status) {
        const orders = await this.findByParameter({"status" : status})
        return orders
    }

    async getAllOrdersForUser(userId){
        const orders = await this.findByParameter({"user" : userId})
        return orders
    }
}

module.exports = new OrderService()
