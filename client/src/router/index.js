import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '@/components/User/Index'
import UserCreate from '@/components/User/CreateUser'
import UserEdit from '@/components/User/EditUser'
import UserShow from '@/components/User/ShowUser'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/user',
        name: 'user',
        component: UserIndex
    }, {
        path: '/user/create',
        name: 'users-create',
        component: UserCreate
    }, {
        path: '/user/edit',
        name: 'user-edit',
        component: UserEdit
    }, {
        path: '/users',
        name: 'users',
        component: UserShow
    }, ]
})