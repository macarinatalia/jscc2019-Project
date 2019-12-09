<template>
  <div id="app">
    <div id="topbar">
      <div id="user"> {{user.name}} </div>
     
      <login v-show="isModalVisible" @close="closeLoginModal" />
      <div id="icons">
        <font-awesome-icon id="userIcon" :icon="['fas', 'user-circle']" size="2x" @click="showLoginModal()"/>
        <span id="cartIcon" class="fa-layers fa-fw">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2x"  @click="showCartModal()"/>
          <span class="fa-layers-counter" v-if="cartNumber>0"> {{cartNumber}}</span>
        </span>
      </div>
      <shopping-cart v-show="isCartModalVisible" @close="closeCartModal" />
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/restaurants">Restaurants</router-link> <slot v-if="isLoggedIn"> | </slot>
      <router-link to="/orders" v-if="isLoggedIn">Orders</router-link> 
    </div>
    
    <router-view id="router"/>
  </div>
</template>


<script>

import Login from './components/login.vue';
import ShoppingCart from './components/shopping-cart.vue';
import NotificationBell from 'vue-notification-bell'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
      return {
        isModalVisible: false,
        isCartModalVisible: false
      };
    },
  components: {
      Login, ShoppingCart, NotificationBell
  },
  computed: {
      ...mapState(['user', 'username', 'isLoggedIn', 'shoppingCart', 'cartNumber']),
    
      userOrdersUrl() {
        debugger
        return `/user/${this.user._id}/orders`
      }

  },
  methods:{
    ...mapActions(['loginUser']),
    showLoginModal() {
        this.isModalVisible = true;
      },
    closeLoginModal() {
        this.isModalVisible = false;
    },
    showCartModal() {
        this.isCartModalVisible = true;
      },
    closeCartModal() {
        this.isCartModalVisible = false;
    },
    setAuthenticated(status) {
          this.isLoggedIn = status;
    },   
    getRouteLink(){
      return "/user/" + this.user._id + "/orders"
    } 
  },
  mounted() {
    if(!this.isLoggedIn) {
        console.log('User is loged in as : ' + user.username)
    }
  },
  created() {
    
  }
}
</script>

<style>
*{
  padding:0;
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  padding: 0px;
  background-image: url(~@/assets/images/home_bkg.jpg);
  background-position: center;
  background-repeat:  no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}

#topbar{
  align-items: center;
  display: flex;
  height: 20px;
  justify-content: flex-end;
  margin: 0 auto;
  padding-top: 10px;
  
}

#icons{
  height: 100%;
  padding-right: 20px;
}

#userIcon,
#cartIcon{
  vertical-align: middle;
  padding-right: 10px;
  padding-top: 3px;
}
#user{
  background-color: transparent;
  text-align: right;
  height: 20px;
  padding-top: 10px;
  padding-right: 10px;
}
#loginBtn,
#shoppingCartBtn{
  width: 50px;
  height: 50px;
  color: #0a3847;
  
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 28px;
  cursor: pointer;
  border: 0;
  outline: 0;   
  background-color: transparent;     
}

#loginBtn{
  background-image: url(~@/assets/images/icons/login.png);
}

#shoppingCartBtn{
  background-image: url(~@/assets/images/icons/shopping-cart.svg);
}

#nav {
  padding: 0 30px 30px 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#router{
  background-size: cover;
}

.fa-layers-counter {
  zoom: 300%;
  position: relative;
  left: -2rem;
  top: -1rem;
  background-color: orange;
}

.fa-layers{
  cursor: pointer;
  height: 20px;
  width: 20px;
}
</style>
