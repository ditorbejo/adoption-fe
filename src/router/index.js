import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeAdminView from '../views/HomeAdminView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TambahKategoriView from '../views/TambahKategoriView.vue'
import TambahAlbumView from '../views/TambahAlbumView.vue'
import TambahBeritaView from '../views/TambahBeritaView.vue'
import TambahKucingView from '../views/TambahKucingView.vue'
import DaftarListKategoriAdminView from '../views/DaftarListKategoriAdminView.vue'
import DetailKategoriAdminView from '../views/DetailKategoriAdminView.vue'
import EditKategoriAdminView from '../views/EditKategoriAdminView.vue'
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
      path: '/tambah-kategori',
      name: 'tambah-kategori',
      component: TambahKategoriView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/tambah-album',
      name: 'tambah-album',
      component: TambahAlbumView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/tambah-berita',
      name: 'tambah-berita',
      component: TambahBeritaView,
      meta: {
        roles : ['user','admin']
      }
    },
    {
      path: '/tambah-kucing',
      name: 'tambah-kucing',
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
      name: 'detail-kategori',
      component: DetailKategoriAdminView,
      meta: {
        roles : ['admin']
      }
    },
    {
      path: '/admin/category/edit/:id',
      name: 'edit-kategori',
      component: EditKategoriAdminView,
      meta: {
        roles : ['admin']
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
