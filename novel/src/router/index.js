import Vue from 'vue'
import Router from 'vue-router'
import Bookrack from '@/components/bookrack/bookrack'
import Bookmall from '@/components/bookmall/bookmall'
import Discover from '@/components/discover/discover'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  	  path: '/',
  	  redirect: '/bookrack'
  	},
    {
      path: '/bookrack',
      name: 'Bookrack',
      component: Bookrack
    },
    {
      path: '/bookmall',
      name: 'Bookmall',
      component: Bookmall
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    }
  ]
});
