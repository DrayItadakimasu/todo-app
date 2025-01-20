import { createMemoryHistory, createRouter } from 'vue-router'

// pages
import MainPage from '@/pages/index.vue';


const routes = [
    {
        path: '/',
        component: MainPage,
    }
]


const router = createRouter({
    history: createMemoryHistory(),
    routes
});


export default router;
