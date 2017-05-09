import Vue from 'vue'
import Router from 'vue-router'
import Exercise from '@/components/Exercise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Exercise',
      component: Exercise
    }
  ]
})
