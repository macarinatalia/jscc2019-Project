<template lang="pug">
  div.modal-backdrop
    div.modal
        header.modal-header
            h4.header Write a review ...
            button.closeBtn(@click="close") x

        section.modal-body
            textarea.review(v-model="review" placeholder="Add review")
            input.rating(placeholder="Rating from 1 to 5", v-model="rating")
        footer.modal-footer
            button.btnSubmit(@click="submitReview(review, rating)") Submit
        

</template>

<script>

import { mapState, mapActions } from 'vuex'
  export default {
    name: 'WriteReview',
     data() {
        return {
            review: '',
            rating: ''
        }
    },
    computed: {
      ...mapState(['user', 'restaurant'])
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submitReview(review, rating) {
            this.$store.dispatch('writeReview', {user: this.user._id, rest: this.restaurant._id, name: review, rating: Number(rating)})
            this.review = ''
            this.rating = ''
            this.$emit('close')
        },
    },
  };
</script>



<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible !important;
    z-index: 100;
 
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 400px;
    border-radius: 2px;
    overflow: visible !important;
 
  }

  .modal-header,
  .modal-footer {
    padding: 5px 10px;
    display: flex;
  }

  .modal-header {
   /* border-bottom: 1px solid #eeeeee;*/
    color: orange;
    justify-content: space-between;
    height: 30px;
  }

  .header{
      margin-top: 5px;
  }

  .modal-footer {
    justify-content: center;
  }

  .modal-body {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
  }

  .closeBtn {
    border: 0;
    font-size: 15px;
    cursor: pointer;
    font-weight: 400px;
    color: orange;
    background: transparent;
    height: 10px;
    line-height: 1;
    outline: 0;   
  }


  .review,
  .rating{
    padding: 10px;
    margin-bottom: 10px;
  }

.btnSubmit{
    text-align: center;
    font-size: 14px;
    background-color: orange;
    color: #fff;
    height: 2.5rem;
    padding: 10px 20px;
    margin-bottom: 15px;
    cursor: pointer;
    outline: 0;
    border: 0px;
    width: 100%;
    border-radius: 2px 2px 2px 2px;
}
</style>