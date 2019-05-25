/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import el_tree from '@/components/el_tree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'el_tree',
      component: el_tree
    }
  ]
})

