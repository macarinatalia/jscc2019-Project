<template lang="pug">
section
 div.food-box
  div.food-description
    div.food-section
        div.food-name {{ food.name }} 
        div.food-ingridients
            span {{food.ingridients.join(', ')}}
        div 
            span Qty: {{ quantity}} 
    div.food-price 
        span Price: {{ price.toFixed(2)}} €
    
  
  
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'OrderFoodCard',
  props: ['food', 'price', 'quantity'],
  methods: {
    
  },
}
</script>


<style scoped>
.food-box{
  border: 1px solid #ebebeb;
  border-radius: 2px;
  background-color: #fff;
  margin: 8px 0;
  padding: 16px;
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.food-description {
  height: 100%;
    width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}

.food-section{
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 75%;
}

.food-name{
  font-size: 20px;
  font-weight: bold;
  line-height: 1.22;
  color: #0a3847;
  margin: 0 0 4px;
}

.food-ingridients{
  font-size: 12px;
  font-style: italic;
  color: #666;
  line-height: 1.5;
  margin: 0 0 4px;
}

.food-price{
  font-size: 18px;
  font-weight: bold;
  color: orange;
  line-height: 1.22;
  letter-spacing: -.5px;
  text-align: right;
  margin: auto 0 0;
  width: 25%;
}


</style>