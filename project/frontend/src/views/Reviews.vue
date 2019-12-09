<template lang="pug">
    div.restaurant-reviews
        div.overview
            div.overview-container
                div.info
                    span.restaurant-name {{restaurant.name}}
                    section.rating-data
                        div.rating-number
                            span {{restaurant.rating.toFixed(1)}}
                        div.image
                            img.rating-stars(:src="getRatingImgUrl(restaurant.rating)", alt="") 
                        span.reviews ({{restaurant.reviews.length}} Reviews)
                div.write-review(v-if="isLoggedIn")
                    write-review(v-show="isModalVisible" @close="closeWriteReviewModal")
                    button.writeReviewBtn(@click="showWriteReviewModal()")    
                
        div.review-box
            div.review-list 
                review-card(v-for="review in reviews", :review="review",  :key="review.id")
</template>

<script>
import WriteReview from '@/components/write-review.vue';
import ReviewCard from '@/components/review-card.vue'
import sortArray from 'sort-array'
import { mapState, mapActions } from 'vuex'

export default {
    data () {
      return {
        isModalVisible: false
      }
    },
    components: {
        ReviewCard, WriteReview
     },
     
    computed: {
        ...mapState(['user', 'isLoggedIn']),
        reviews() {
            //sort reviews desc
            return this.sort(this.$store.state.reviews)
        },
        restaurant(){
            return this.$store.state.restaurant
        }
        
    },
    methods: {
        
        getRatingImgUrl(rating){
            let name = 0
            switch (true) {
                case rating < 1.5 && rating >= 0:
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
        },
        writeReview(){
            this.$store.dispatch('writeReview', {user: this.user._id, rest: this.restaurant._id})
        },
        showWriteReviewModal() {
            this.isModalVisible = true;
        },
        closeWriteReviewModal() {
            this.isModalVisible = false;
        },
        sort(reviews){
            return sortArray(reviews, {by: "date", order: "desc"})
        },
    },
    created() {
        
    },
    
    
    
}
</script>

<style scoped>
.overview{
    background-color:seashell;
    margin: 16px;
    padding-left: 20px;
    height: 90px;
    text-align: left;
    
}

.overview-container{
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.info{
    display: flex;
    flex-direction: column;
}
.rating-data{
    flex-direction: row;
    display: flex;
    align-items: left;
}
.rating-number{
    font-weight: 700;
    font-size: 30px;
    width: 55px;
    height: 40px;
    border-right: 1px solid #666;
    vertical-align: middle;
    text-align: left;
}
.restaurant-reviews{
    font-weight: 400;
    padding: 0;
}
.review-list {
    padding: 0 16px;
}

.rating {
    font-weight: 700;
    font-size: 18px;
}

.total-rating-info{
    text-align: right;
}

.rating-stars{
    height: 100%;
    transform: scale(0.5);
    margin-left: -50px;
}

.image{
    height: 40px;
    padding-left: 10px;
    
}

.reviews {
    margin-left: -40px;
    vertical-align: center;
    padding-top: 15px;
    font-size: 14px;
}

.restaurant-name{
    font-weight: 700;
    font-size: 20px;
}

.writeReviewBtn{
  justify-content: center;
  width: 50px;
  height: 50px;
  color: #0a3847;
  background-image: url(~@/assets/images/icons/review.svg);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 22px;
  cursor: pointer;
  border: 0px white;
  background-color: transparent;
  outline: 0;        
}
</style>