<template  lang="pug">
  main
    section.order-history
        div.order-history-filter
        div.order-history-result
            order-card(v-for="order in orders", :order="order", :key="order.id")
    
</template>

<script>
import OrderCard from '@/components/order-card.vue'
import sortArray from 'sort-array'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'userOrders',
  components: {
    OrderCard
  },
  computed: {
         orders() {
            //sort reviews desc
            return this.sort(this.$store.state.orders)
        },
    },
  methods:{  
      ...mapActions(['fetchUserOrders'])  ,
      sort(orders){
            return sortArray(orders, {by: "date", order: "desc"})
      },
  },
  created() {
    this.fetchUserOrders()
  }
  
}
</script>

<style scoped>
.order-history {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
}

.order-history-result{
    display: flex;
    flex-direction: column;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
}
</style>