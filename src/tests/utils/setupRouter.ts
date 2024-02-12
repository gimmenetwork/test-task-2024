import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const testRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
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
    {
        path: '/books',
        name: 'BooksView',
        component: () => import('@/views/books/BooksView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/add-book',
        name: 'AddNewBook',
        component: () => import('@/views/books/AddNewBook.vue'),
        meta: { requiresAuth: true },
    },
];

export function setupTestRouter() {
    return createRouter({
        history: createWebHistory(),
        routes: testRoutes,
    });
}
