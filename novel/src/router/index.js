import Vue from 'vue'
import Router from 'vue-router'
import Bookrack from '@/components/bookrack/bookrack'
import Bookmall from '@/components/bookmall/bookmall'
import Discover from '@/components/discover/discover'
import Bookintro from '@/components/bookintro/Bookintro'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  	  path: '/',
  	  redirect: '/Bookmall'
  	},
    {
      path: '/bookrack',
      name: 'Bookrack',
      component: Bookrack
    },
    {
      path: '/bookmall',
      name: 'Bookmall',
      component: Bookmall,
      children: [
        {
          path: ':bkey',
          name: 'Bookintro',
          component: Bookintro
        }
      ]
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    }
  ]
});
