import { createRouter, createWebHistory } from 'vue-router'
import PollQuestion from '../views/PollQuestion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PollQuestion,
    }
  ],
})

export default router
