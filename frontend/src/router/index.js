import Vue from 'vue'
import Router from 'vue-router'
import NewPerson from '@/components/NewPerson'
import PeopleList from '@/components/PeopleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PeopleList',
      component: PeopleList
    },
    {
      path: '/new',
      name: 'NewPerson',
      component: NewPerson
    }
  ]
})
