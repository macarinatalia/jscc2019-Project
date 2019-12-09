<template lang="pug">
article.card
    section.title
        section.title-order
            div.order-number
                span Order: 
                router-link.order-link(:to="orderUrl") {{ order.orderNumber }}
            div.order-date 
                span.separator |
                span {{formatDate(order.date)}}
        section.price-order
            span Total: 
            span {{order.orderPrice.toFixed(2)}} €
        section.status-order
            span {{order.status}}
    section.restaurant
        span Restaurant: {{order.restaurant.name}}
    section.body
        section.order-body
            div.foods
                order-food-card(v-for="(food, index) in order.food", :food="food"
                                                                , :price="order.foodPrice[index]"
                                                                , :quantity="order.foodQuantity[index]" :key="food.id")
                    
        section.order-actions    
            button.reorderBtn(@click="reorder") Reorder 
</template>


<script>
import moment from 'moment'
import OrderFoodCard from '@/components/order-food-card.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'OrderCard',
  props: ['order'],
  components: {
    OrderFoodCard
  },
  methods: {
      formatDate(date){
          return moment(date).format("LLL")
      },
      reorder(){
          this.$store.dispatch('reorderOrder', this.order._id)
      }
  },
  computed: {
    orderUrl() {
      return `/order/${this.order._id}`
    },
    
  }
}
</script>

<style scoped>
.card {
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px;
  min-width: 200px;
  background-color: antiquewhite
}

.title,
.restaurant {
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 700;
}

.body{
    display: flex;
    flex-direction: row;
}

.title-order{
    width: 75%;
}

.price-order{
    width: 20%
}

.status-order{
    width: 30%;
    text-align: right;
    color:seagreen;
}

.order-number,
.order-date{
    display: inline;
    margin: 0;
    padding: 0;
    border: 0;
}

.order-link{
    color: #0073b1;
    text-decoration: none;
}

.price-order{
    width: 20%
}

.separator{
    color: #999;
    padding: 0 5px;
}

.order-body{
    width: 75%;
}

.order-actions{
    width: 25%;
}

.reorderBtn{
    width: 85%;
    margin-top: 10px;
    margin-left: 20px;
    float: right;
    height: 30px;
    border-radius: 8px;
    background-color: orange;
    border: 1px #4c4c4c;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    outline: 0;  

}

</style>
