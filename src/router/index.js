import Vue from 'vue'
import Router from 'vue-router'
import Write from '@/components/write/Write'
import Success from '@/components/success/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Write',
      component: Write
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    }
  ]
})
