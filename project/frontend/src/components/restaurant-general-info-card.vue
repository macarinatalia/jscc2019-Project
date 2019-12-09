<template lang="pug">
article.card
    router-link.a(:to="restaurantUrl")
        div.restaurant-details-box
            img.rest-image(:src="getImgUrl(restaurant.img)", alt="")
            div.reviews 
                img.rating-stars(:src="getRatingImgUrl(restaurant.rating)", alt="") 
                div.reviews-count ({{restaurant.reviews.length}})
            div 
                h2.restaurantName {{ restaurant.name }}
                h4.restaurantAddress {{ restaurant.address}} 
                h4.restaurantAddress {{ restaurant.index }} 

</template>


<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RestaurantGeneralInfoCard',
  props: ['restaurant'],
  computed: {
    restaurantUrl() {
      return `/restaurant/${this.restaurant._id}`
    }
  },
  methods: {
    ...mapActions(['addToFavorite']),
    getImgUrl(img) {
      return require('../assets/images/restaurant/' + img)
    },
    getRatingImgUrl(rating){
        let name = 0
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
                name = 1
                break
        }

        return require('../assets/images/icons/rating-' + name + '.png')
    }
  }

}
</script>


<style scoped>

.card {
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: beige;
  border-radius: 3px;
  margin: 20px;
  width: 200px;
  height: 200px;
}

.a {  
    text-decoration: none;
    }


.restaurant-container{
  max-width: 1130px;
  margin: 0 auto;
  position: relative;
  padding: 0 15px;
}
  
.restaurant-details-box{
  padding: 10px 20px;
  text-align: left;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative; 

}
.favorite-box {
  background: #fff;
  display: inline-flex;
  height: 50px;
  line-height: 46px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 18px;
}
.rest-image{
    max-width: 100px;
    max-height: 100px;
    border: 2px black;
    height: auto;
    align-content: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

.rating-stars{
    height: 50px;
    width: auto;
    transform: scale(0.25);
    margin-left: -100px;
}

.reviews-count{
  padding-top: 15px;
  padding-left: 5px;
  margin-left: -100px;
}

.add-to-favorite-button{
  justify-content: center;
  width: 50px;
  height: 48px;
  color: #0a3847;
  background-image: url(~@/assets/images/icons/icon_empty_fav.svg);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 22px;
  cursor: pointer;
  border: 0px white;
  outline: 0;           /*remove blue border on click*/
}



.reviews{
  color: darkgray;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content:center;
}

.restaurantName {
  padding: 0;
  font-family: Takeaway Sans Bold,Avant Garde,Century Gothic,Helvetica,Arial,sans-serif;
  color: #0a3847;
  font-size: 18px;
  line-height: 22px;
  max-height: 66px;
  overflow: hidden;
  margin: 0;
}

.restaurantAddress {
  line-height: 22px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 4px;
  color: #666;
}
 
</style>