import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        components: {v_main: () => import('@/views/pages/home.vue')},
        redirect: '/list',
        children: [
            {
                path: '/list',
                components: {v_content: () => import('@/views/pages/list.vue')}
            },
            {
                path: '/write',
                components: {v_content: () => import('@/views/pages/write.vue')}
            },
            {
                path: '/read/:id',
                components: {v_content: () => import('@/views/pages/read.vue')}
            }
        ]
    },
    {
        path: '/user',
        components: {v_main: () => import('@/views/user/index.vue')},
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router