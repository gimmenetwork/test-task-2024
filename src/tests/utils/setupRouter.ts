import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const testRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
    },
];

export function setupTestRouter() {
    return createRouter({
        history: createWebHistory(),
        routes: testRoutes,
    });
}
