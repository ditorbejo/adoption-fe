import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeAdminView from '../views/HomeAdminView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TambahKategoriView from '../views/TambahKategoriView.vue'
import TambahBeritaView from '../views/TambahBeritaView.vue'
import TambahKucingView from '../views/TambahKucingView.vue'
import DaftarListKategoriAdminView from '../views/DaftarListKategoriAdminView.vue'
import DetailKategoriAdminView from '../views/DetailKategoriAdminView.vue'
import EditKategoriAdminView from '../views/EditKategoriAdminView.vue'
import DaftarListBeritaView from '../views/DaftarListBeritaView.vue'
import DetailBeritaAdminView from '../views/DetailBeritaAdminView.vue'
import EditBeritaAdminView from '../views/EditBeritaAdminView.vue'
import DaftarListKucingAdminView from '../views/DaftarListKucingAdminView.vue'
import DetailKucingAdminView from '../views/DetailKucingAdminView.vue'
import EditKucingAdminView from '../views/EditKucingAdminView.vue'
import DaftarListKategoriUserView from '../views/DaftarListKategoriUserView.vue'
import DaftarKucingByKategoriUserView from '../views/DaftarKucingByKategoriUserView.vue'
import DetailKucingUserView from '../views/DetailKucingUserView.vue'
import TambahFormAdoptKucingUserView from '../views/TambahFormAdoptKucingUserView.vue'
import DaftarListFormAdoptUserView from '../views/DaftarListFormAdoptUserView.vue'
import DetailFormAdoptUserView from '../views/DetailFormAdoptUserView.vue'

import axios from 'axios'

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
      component: DaftarListBeritaView,
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
      path: '/admin/pets/edit/:id',
      name: 'edit-kucing-admin',
      component: EditKucingAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/user/list-kategori',
      name: 'list-kategori-user',
      component: DaftarListKategoriUserView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/user/category/:id',
      name: 'list-pet-by-kategory-user',
      component: DaftarKucingByKategoriUserView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/user/pets/:id',
      name: 'detail-kucing-user',
      component: DetailKucingUserView,
      meta: {
        roles : ['user','admin']
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

  ]
})

router.beforeEach(async(to,from)=>{
  let role = 'guest';
  const isAunthenticated = localStorage.getItem('token')!== null;
  if(isAunthenticated){
    const token  = localStorage.getItem('token');
    try{
      const roleResponse = await axios.get('http://127.0.0.1:8000/api/auth/role',{
        headers : {
          Authorization: `Bearer ${token}`
        }
      });
      if(roleResponse.status == 200){
        role = roleResponse.data.role;
      }
    }catch(error){
      console.log(error)
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
