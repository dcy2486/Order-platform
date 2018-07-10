import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods'
import rating from '@/components/rating'
import seller from '@/components/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/rating',
      component: rating
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
