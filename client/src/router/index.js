import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import MedicineIndex from '@/components/Medicines/index'  // เปลี่ยนจาก Blogs เป็น Medicines
import MedicineCreate from '@/components/Medicines/CreateMedicine'  // เปลี่ยนจาก CreateBlog เป็น CreateMedicine
import MedicineShow from '@/components/Medicines/ShowMedicine'  // เปลี่ยนจาก ShowBlog เป็น ShowMedicine
import MedicineEdit from '@/components/Medicines/EditMedicine'  // เปลี่ยนจาก EditBlog เป็น EditMedicine

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/medicines',  // เปลี่ยนจาก /blogs เป็น /medicines
      name: 'medicines',  // เปลี่ยนจาก blogs เป็น medicines
      component: MedicineIndex
    },
    {
      path: '/medicine/create',  // เปลี่ยนจาก /blog/create เป็น /medicine/create
      name: 'medicine-create',  // เปลี่ยนจาก blog-create เป็น medicine-create
      component: MedicineCreate
    },
    {
      path: '/medicine/edit/:medicineId',  // เปลี่ยนจาก /blog/edit/:blogId เป็น /medicine/edit/:medicineId
      name: 'medicine-edit',  // เปลี่ยนจาก blog-edit เป็น medicine-edit
      component: MedicineEdit
    },
    {
      path: '/medicine/:medicineId',  // เปลี่ยนจาก /blog/:blogId เป็น /medicine/:medicineId
      name: 'medicine',  // เปลี่ยนจาก blog เป็น medicine
      component: MedicineShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
  ]
})
