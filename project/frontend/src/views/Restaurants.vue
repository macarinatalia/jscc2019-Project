<template  lang="pug">
  div.restaurants
    h2 You can order from {{restaurants.length}} restaurants
    
    input.inputIndex(v-model="index" placeholder="Enter index") 
    button.btnSearch(v-on:click="searchRestByIndex()") Search
    div
      restaurant-general-info-card(v-for="restaurant in restaurants" :restaurant="restaurant" :key="restaurant.id")
      
</template>


<script>
import RestaurantGeneralInfoCard from '@/components/restaurant-general-info-card.vue'
export default {
  name: 'restaurants',
  components: {
    RestaurantGeneralInfoCard
  },
  beforeRouteEnter(to, from, next) {
    console.log(to)
    console.log(from)
    next(vm => {
      if(to.name == "restaurants") {
        vm.$store.dispatch('fetchRestaurants')
      } 
    })
  },
  mounted(){
    if(this.index == "" && this.restaurants.length == 0){
     this.$store.dispatch('fetchRestaurants')
    }
  },
  computed:{
    restaurants() {
      return this.$store.state.restaurants
    },
    index: {
      get: function (){
        return this.$store.state.index
      },
      set: function (newValue) {
        this.$store.state.index = newValue;
      }
    }
  },
  methods:{
    searchRestByIndex(){
      if(this.index != ""){
        this.$store.dispatch('fetchRestaurantsByIndex', this.index)
        var location = this.$route.fullPath
        this.$router.replace('/restaurant/postal/' + this.index)

      }else {
        this.$store.dispatch('fetchRestaurants')
        this.$router.replace('/restaurant/all')
      }
    },
    getImgUrl(img) {
      return require('../assets/images/restaurant/' + img)
    }
    
  }
  
}
</script>

<style scoped>
.restaurant-box {
  margin: 10px;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #ebebeb;
  cursor: pointer;
  position: relative; 
}
.rest-image{
    max-width: 80px;
    max-height: 80px;
    height: auto;
    padding: 0 10px 0 0;
    align-content: center;
  }

 h2 {
   background-color: transparent;
 } 


 .inputIndex {
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;

  font-size: 1rem;
  /*background-color: white;*/
  height: 3rem;
  border-radius: 2px 0 0 2px;
  padding: 0 21px;
  /*border: 1px solid grey;*/
  line-height: 3rem;
}
.btnSearch {
  padding: 0 21px;
  /*border: 1px solid #1574f5;*/
  background-color: #1574f5;
  color: #fff;
  cursor: pointer;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1rem;
  border-radius: 0 2px 2px 0;
  white-space: nowrap;
}
</style>