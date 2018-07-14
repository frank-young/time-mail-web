import Vue from 'vue'
import Router from 'vue-router'
import Write from '@/components/write/Write'
import Find from '@/components/find/Find'
import FindDetail from '@/components/find/FindDetail'
import Success from '@/components/success/Success'
import Ucenter from '@/components/ucenter/Ucenter'
import Feedback from '@/components/ucenter/Feedback'
import AboutUs from '@/components/ucenter/AboutUs'
import MyLetter from '@/components/ucenter/MyLetter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Write',
      component: Write
    },
    {
      path: '/write/success',
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
    },
    {
      path: '/ucenter',
      name: 'Ucenter',
      component: Ucenter
    },
    {
      path: '/ucenter/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/ucenter/aboutus',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/ucenter/myletter',
      name: 'MyLetter',
      component: MyLetter
    }
  ]
})
