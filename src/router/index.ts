import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
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
    {
        path: '/edit-book/:id',
        name: 'EditBook',
        component: () => import('@/views/books/EditBook.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/review-book/:id',
        name: 'ReviewBook',
        component: () => import('@/views/books/ReviewBook.vue'),
        meta: { requiresAuth: true },
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
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => import('@/views/general/PageNotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();
    const localToken = localStorage.getItem('authToken');
    const isAuthenticated = authStore.token || localToken;

    // Redirect logged-in users away from login and register pages
    if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
        next({ name: 'BooksView' });
        return;
    }

    if (to.meta.requiresAuth && !authStore.token) {
        next({ name: 'Home' });
    }

    next();
});

export default router;
