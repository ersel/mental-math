import Vue from 'vue'
import Router from 'vue-router'
import Exercise from '@/components/Exercise'
import Homepage from '@/components/Homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/exercise1',
      name: 'Exercise',
      component: Exercise
    },
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    }
  ]
})
