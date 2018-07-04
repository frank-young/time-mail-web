import Vue from 'vue'
import Router from 'vue-router'
import Write from '@/components/write/Write'
import Find from '@/components/find/Find'
import FindDetail from '@/components/find/FindDetail'
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
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    },
    {
      path: '/find/detail',
      name: 'FindDetail',
      component: FindDetail
    }
  ]
})
