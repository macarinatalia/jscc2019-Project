<template lang="pug">
    div.restaurant-info-box
      div.restaurant-container
        img.rest-image(:src="'/images/restaurant/' + restaurant.img", alt="")
        div.restaurant-details-box
            h1 {{restaurant.name}}
            h4 {{restaurant.address}}, {{ restaurant.index}}
            div.reviews
              img.rating-stars(:src="'/images/rating/rating-' + dynamic_image + '.png'", alt="") 
              router-link.a(:to="reviewsUrl") ({{reviews_length}} Reviews)
        div.favorite-box 
        
              img.add-to-favorite(v-if="isLoggedIn" :src="currentFavouriteImg", v-on:click="addToFavorite()")
</template>


<script>
// + restaurant.rating.toFixed(0) + 
//'/images/rating/rating-' + getRatingImgUrl() + '.png'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RestaurantInfoCard',
  props: ['restaurant'],
  computed: {
    ...mapState(['isLoggedIn','user']),
    reviewsUrl() {
      return `/restaurant/${this.restaurant._id}/reviews`
    },
    currentFavouriteImg: function(){
      let img = "icon_empty_fav.png"
      if(this.isLoggedIn){
          const index = this.user.favoriteRestaurants.findIndex(x => x._id === this.restaurant._id)
          if (index != -1) {
            img = "icon_fav.png"
          }
      }
      return require('../assets/images/icons/' + img)
    },
    'dynamic_image': function() {
      let name = 0
      let rating = 0
      if(this.restaurant.rating == undefined) { 
          rating = 0 
      }else {
          rating = this.restaurant.rating 
      }
      
      switch (true) {
            case rating == 0:
                name = 0
                break
            case rating < 1.5 && rating > 0:
                name = 1
                break
            case rating < 2.5 && rating >= 1.5:
                name = 2
                break
            case rating < 3.5 && rating >= 2.5:
                name = 3
                break
            case rating < 4.5 && rating >= 3.5:
                name = 4
                break
            case rating <= 5 && rating >= 4.5:
                name = 5
                break
            default:
                name = 0
                break
        }

      return name
    },
    'reviews_length': function() {
      let l = 0
      if (this.restaurant.reviews == undefined){
        l = 0
      }else{
        l = this.restaurant.reviews.length 
      }
      return l
    }
    
    
  },
  methods: {
    ...mapActions(['addToFavorite']),
    addToFavorite(){
      if(this.isLoggedIn){
        this.$store.dispatch('addRestaurantToFavorites', {user: this.user._id, rest: this.restaurant._id})
        //var imgElement = document.getElementById('add-to-favorite');
   
        //imgElement.src = this.getFavouriteImg(this.user.favoriteRestaurants)
      }
    }
  },

}
</script>


<style scoped>
.a {  
    text-decoration: none;
    color: orange;
    cursor: pointer;
    font-size: 15px;
    padding-top: 20px;
    padding-left: 5px;
    margin-left: -120px;
  }
.restaurant-info-box {
  margin-bottom: 16px;
}

.restaurant-container{
  max-width: 1130px;
  margin: 0 auto;
  position: relative;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #ebebeb;
}
  
.restaurant-details-box{
  padding: 20px 0 20px 0;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  
  
  position: relative; 

}

.reviews{
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content:left;
}

.rating-stars{
    height: 60px;
    width: auto;
    transform: scale(0.25);
    margin-left: -120px;
}

.favorite-box {
  background: #fff;
  display: inline-flex;
  height: 30px;
  line-height: 46px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 18px;
}
.rest-image{
    width: auto;
    height: 100px;
    align-content: center;
    padding: 20px;
  }
.add-to-favorite{
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #0a3847;
  /*background-image: url(~@/assets/images/icons/icon_empty_fav.png);*/
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 22px;
  cursor: pointer;
  border: 0px white;
  outline: 0;           /*remove blue border on click*/
}

</style>