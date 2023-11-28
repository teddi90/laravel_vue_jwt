import {createRouter, createWebHistory} from 'vue-router'


const route= createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/fruits',
            name: 'fruit.index',
            component: () => import('./components/Fruit/Index.vue')
        },
        {
            path: '/users/login',
            name: 'user.login',
            component: () => import('./components/User/Login.vue')
        },
        {
            path: '/users/registration',
            name: 'user.registration',
            component: () => import('./components/User/Registration.vue')
        },
        {
            path: '/users/personal',
            name: 'user.personal',
            component: () => import('./components/User/Personal.vue')
        },

    ],
});

route.beforeEach((to,from,next)=>{
    const accessToken=localStorage.getItem('access_token')
    if(to.name!=='user.login'){
        if(!accessToken){
            return next({
                name:'user.login'
            })
        }
    }
    if(to.name ==='user.login' && accessToken) {
        return next({
            name:'user.personal'
        })
    }
    next();
})
export default route;




