import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Habilidades from '@/views/Habilidades.vue'
import Sobre from '@/views/Sobre.vue'
import Status from '@/views/Status.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: 'sobre', component: Sobre },
      { path: 'status', component: Status },
      { path: 'habilidades', component: Habilidades }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
