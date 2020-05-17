import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {auth:true},
            component: () => import('../views/Home.vue')
        },

        {
            path: '/login',
            name: 'Login',
            meta: {layout: 'empty'},
            component: () => import('../views/Login.vue')
        },

        {
            path: '/Register',
            name: 'Register',
            meta: {layout: 'empty'},
            component: () => import('../views/Register.vue')
        },

        {
            path: '/categories',
            name: 'Categories',
            meta: {layout: 'main', auth:true},
            component: () => import('../views/Categories.vue')
        },

        {
            path: '/detail/:id',
            name: 'DetailRecord',
            meta: {layout: 'main', auth:true},
            component: () => import('../views/DetailRecord.vue')
        },

        {
            path: '/history',
            name: 'History',
            meta: {layout: 'main', auth:true},
            component: () => import('../views/History.vue')
        },

        {
            path: '/planning',
            name: 'Planning',
            meta: {layout: 'main', auth:true,},
            component: () => import('../views/Planning.vue')
        },

        {
            path: '/profile',
            name: 'Profile',
            meta: {layout: 'main', auth:true},
            component: () => import('../views/Profile.vue')
        },

        {
            path: '/record',
            name: 'Record',
            meta: {layout: 'main', auth:true},
            component: () => import('../views/Record.vue')
        },

        {
            path: '*',
            name: 'NotFound',
            meta: {layout: 'empty'},
            component: () => import('../views/NotFound.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const userCurrent = firebase.auth().currentUser;

    if(!userCurrent && to.meta.auth) {
        next('/login?message=logout')
    }else {
        next();
    }
});

export default router
