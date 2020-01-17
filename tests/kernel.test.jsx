import {createLocalVue, mount} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Login from "./Login";
import Dashboard from "./Dashboard";
import Kernel from "../src";

// setup a vue instance
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

// setup the store
const store = new Vuex.Store({
    state: { loggedIn: false }
});

// create a middleware
const auth = function ({ store, redirect, next }){

    if(!store.getters['loggedIn']){
        return redirect('Login');
    }

    return next();
};

// setup the router
const routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            middleware: [
                auth,
            ]
        },
    },
];

const router = new VueRouter({
    routes
});

// Setup the router kernel system
router.beforeEach((to, from, next) => {
    let kernel = new Kernel(to, next, store);
    kernel.run();
});

test('it redirects back to login if not logged in', () => {
    const wrapper = mount(Dashboard, {
        localVue,
        router,
        store
    });

    router.push('/dashboard');
    expect(wrapper.vm.$route.path).toBe('/login');
});

test('it goes to the dashboard if logged in', () => {
    store.state['loggedIn'] = true;

    const wrapper = mount(Dashboard, {
        localVue,
        router,
        store
    });

    router.push('/dashboard');
    expect(wrapper.vm.$route.path).toBe('/dashboard');
});
