import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UserDetailLayout from '../views/UserDetailLayout.vue'
import UserPostsView from '../views/UserPostsView.vue'
import UserAlbumsView from '../views/UserAlbumsView.vue'
import UserTodosView from '../views/UserTodosView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import CompaniesView from '../views/CompaniesView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
    },

    {
      path: '/user/:id',
      component: UserDetailLayout,

      children: [
        {
          path: '',
          redirect: (to) => `/user/${to.params.id}/posts`,
        },

        {
          path: 'posts',
          name: 'user-posts',
          component: UserPostsView,
        },

        {
          path: 'albums',
          name: 'user-albums',
          component: UserAlbumsView,
        },

        {
          path: 'todos',
          name: 'user-todos',
          component: UserTodosView,
        },

        {
          path: 'companies',
          name: 'user-companies',
          component: CompaniesView,
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router