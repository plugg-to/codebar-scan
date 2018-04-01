import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Step1 from '@/components/Step1'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'Step1',
      component: Step1
  	},
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
