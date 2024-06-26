import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeAdminView from '../views/HomeAdminView.vue'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

import TambahKategoriView from '../views/TambahKategoriView.vue'
import TambahBeritaView from '../views/TambahBeritaView.vue'
import TambahKucingView from '../views/TambahKucingView.vue'
import TambahMarkAsAdoptAdminView from '../views/TambahMarkAsAdoptAdminView.vue'
import TambahFormAdoptKucingUserView from '../views/TambahFormAdoptKucingUserView.vue'

import DetailKategoriAdminView from '../views/DetailKategoriAdminView.vue'
import DetailKucingAdminView from '../views/DetailKucingAdminView.vue'
import DetailBeritaAdminView from '../views/DetailBeritaAdminView.vue'
import DetailFormAdoptAdminView from '../views/DetailFormAdoptAdminView.vue'

import DetailKucingUserView from '../views/DetailKucingUserView.vue'
import DetailFormAdoptUserView from '../views/DetailFormAdoptUserView.vue'
import DetailBeritaUserView from '../views/DetailBeritaUserView.vue'

import EditKategoriAdminView from '../views/EditKategoriAdminView.vue'
import EditBeritaAdminView from '../views/EditBeritaAdminView.vue'
import EditKucingAdminView from '../views/EditKucingAdminView.vue'
import RejectFormAdopsiKucingAdminView from '../views/RejectFormAdopsiKucingAdminView.vue'

import DaftarListKucingAdminView from '../views/DaftarListKucingAdminView.vue'
import DaftarListKategoriAdminView from '../views/DaftarListKategoriAdminView.vue'
import DaftarListFormAdoptAdminView from '../views/DaftarListFormAdoptAdminView.vue'
import DaftarListFormAdoptRejectAdminView from '../views/DaftarListFormAdoptRejectAdminView.vue'
import DaftarListHistoryAdoptAdminView from '../views/DaftarListHistoryAdoptAdminView.vue'
import DaftarListBeritaAdminView from '../views/DaftarListBeritaAdminView.vue'
import DaftarListFormAdoptByPetAdminView from '../views/DaftarListFormAdoptByPetAdminView.vue'

import DaftarListKategoriUserView from '../views/DaftarListKategoriUserView.vue'
import DaftarKucingByKategoriUserView from '../views/DaftarKucingByKategoriUserView.vue'
import DaftarListKucingUserView from '../views/DaftarListKucingUserView.vue'
import DaftarListKucingAdoptedView from '../views/DaftarListKucingAdoptedView.vue'
import DaftarListKucingByWarnaUserView from '../views/DaftarListKucingByWarnaUserView.vue'
import DaftarListFormAdoptUserView from '../views/DaftarListFormAdoptUserView.vue'
import DaftarListBeritaUserView from '../views/DaftarListBeritaUserView.vue'


import HalamanChatAdminView from '../views/HalamanChatAdminView.vue'
import HalamanChatUserView from '../views/HalamanChatUserView.vue'
import HalamanChatAdminToUserView from '../views/HalamanChatAdminToUserView.vue'
import AboutView from '../views/AboutView.vue'
import { inject } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        roles : ['user']
      }
    },
    {
      path: '/admin/home',
      name: 'homeAdmin',
      component: HomeAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        roles : ['admin','guest','user']
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        roles : ['guest']
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        roles : ['guest']
      }
    },
    {
      path: '/admin/tambah-kategori',
      name: 'tambah-kategori-admin',
      component: TambahKategoriView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/tambah-berita',
      name: 'tambah-berita-admin',
      component: TambahBeritaView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/tambah-kucing',
      name: 'tambah-kucing-admin',
      component: TambahKucingView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/list-kategori',
      name: 'list-kategori-admin',
      component: DaftarListKategoriAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/category/:id',
      name: 'detail-kategori-admin',
      component: DetailKategoriAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/category/edit/:id',
      name: 'edit-kategori-admin',
      component: EditKategoriAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/list-berita',
      name: 'list-berita-admin',
      component: DaftarListBeritaAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/announcements/:id',
      name: 'detail-berita-admin',
      component: DetailBeritaAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/announcements/edit/:id',
      name: 'edit-berita-admin',
      component: EditBeritaAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/list-kucing',
      name: 'list-kucing-admin',
      component: DaftarListKucingAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/pets/:id',
      name: 'detail-kucing-admin',
      component: DetailKucingAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/pets/:id/adoptions',
      name: 'list-adoptions-by-pet-admin',
      component: DaftarListFormAdoptByPetAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/pets/edit/:id',
      name: 'edit-kucing-admin',
      component: EditKucingAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/list-form-adopt',
      name: 'list-form-adopt-admin',
      component: DaftarListFormAdoptAdminView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/admin/adoptions/:id',
      name: 'detail-form-adopt-admin',
      component: DetailFormAdoptAdminView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/admin/list-history-adopt',
      name: 'list-history-adopt-admin',
      component: DaftarListHistoryAdoptAdminView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/admin/list-form-adopt-reject',
      name: 'list-form-adopt-reject-admin',
      component: DaftarListFormAdoptRejectAdminView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/admin/form-reject/:id',
      name: 'form-reject-admin',
      component: RejectFormAdopsiKucingAdminView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/admin/pets/adopt/:id',
      name: 'tambah-mark-as-adopt-admin',
      component: TambahMarkAsAdoptAdminView,
      meta: {
        roles : ['user','admin']
      }
    },

    {
      path: '/admin/chat',
      name: 'halaman-chat-admin',
      component: HalamanChatAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/chat/:id',
      name: 'halaman-chat-admin-to-user',
      component: HalamanChatAdminToUserView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/user/pets/adopt/:id',
      name: 'tambah-form-adopt-user',
      component: TambahFormAdoptKucingUserView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/user/list-form-adopt',
      name: 'list-form-adopt-user',
      component: DaftarListFormAdoptUserView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/user/adoptions/:id',
      name: 'detail-form-adopt-user',
      component: DetailFormAdoptUserView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/user/chat',
      name: 'halaman-chat-user',
      component: HalamanChatUserView,
      meta: {
        roles : ['admin','user']
      }
    },
    {
      path: '/list-warna-kucing',
      name: 'list-warna-kucing-user',
      component: DaftarListKucingByWarnaUserView,
      meta: {
        roles : ['admin','user','guest']
      }
    },
    {
      path: '/list-berita',
      name: 'list-berita-user',
      component: DaftarListBeritaUserView,
      meta: {
        roles : ['admin','user','guest']
      }
    },
    {
      path: '/announcements/:id',
      name: 'detail-berita-user',
      component: DetailBeritaUserView,
      meta: {
        roles : ['admin','user','guest']
      }
    },
    {
      path: '/list-kategori',
      name: 'list-kategori-user',
      component: DaftarListKategoriUserView,
      meta: {
        roles : ['user','admin','guest']
      }
    },
    {
      path: '/category/:id',
      name: 'list-pet-by-kategory-user',
      component: DaftarKucingByKategoriUserView,
      meta: {
        roles : ['user','admin','guest']
      }
    },
    {
      path: '/list-kucing',
      name: 'list-kucing-user',
      component: DaftarListKucingUserView,
      meta: {
        roles : ['admin','user','guest']
      }
    },
    {
      path: '/list-kucing/adopted',
      name: 'list-kucing-adopted',
      component: DaftarListKucingAdoptedView,
      meta: {
        roles : ['admin','user','guest']
      }
    },
    {
      path: '/pets/:id',
      name: 'detail-kucing-user',
      component: DetailKucingUserView,
      meta: {
        roles : ['user','admin','guest']
      }
    },

    {
      path: '/about',
      name: 'about-cattery',
      component: AboutView,
      meta: {
        roles : ['user','admin','guest']
      }
    },

  ]
})

router.beforeEach(async(to)=>{
  const axios = inject('axios')
  let role = 'guest';
  const isAunthenticated = localStorage.getItem('token')!== null;
  if(isAunthenticated){
    const token  = localStorage.getItem('token');
    try{
      const roleResponse = await axios.get('/api/auth/role',{
        headers : {
          Authorization: `Bearer ${token}`
        }
      });
      if(roleResponse.status == 200){
        role = roleResponse.data.role;
   
      }
    }catch(error){
   
    }
  }
  if(isAunthenticated &&  role == 'admin' && to.name === undefined){
    return{
      name: 'homeAdmin'
    }
  }
  if(isAunthenticated && role == 'user' && to.name === undefined){
    return{
      name: 'home'
    }
  }
  if(!isAunthenticated && to.name === undefined){
    return{
      name: 'login'
    }
  }
  if(role == 'guest' && !to.meta.roles.includes('guest')){
   
    return {
      name: 'login'
    }
  }
  if(role == 'user' && !to.meta.roles.includes('user')){

    return {
      name: 'home'
    }
  }
  if(role == 'admin' && !to.meta.roles.includes('admin')){
  
    return {
      name: 'homeAdmin'
    }
  }
  
})

export default router
