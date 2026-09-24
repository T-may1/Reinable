import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import About from './About.vue'
import Profile from './Profile.vue'
import ProfilesList from './ProfilesList.vue'


const routes = [
  { path: '/', name: 'home', component: Home},
  { path: '/about', name: 'about', component: About},
  { path: '/profile/:id', name: 'profile', component: Profile, props: true },
  { path: '/profiles', name: 'profiles', component: ProfilesList }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router