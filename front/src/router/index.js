import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserDetailLayout from '../views/UserDetailLayout.vue'
import UserPostsView from '../views/UserPostsView.vue'
import UserAlbumsView from '../views/UserAlbumsView.vue'
import UserTodosView from '../views/UserTodosView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import TestPage from '../views/TestPage.vue'
import CompaniesView from '../views/CompaniesView.vue'
import UserDetailView from '../views/UserDetailView.vue'


const routes = [
  {
    path: '/test',
    component: TestPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
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