import {createLocalVue, mount} from '@vue/test-utils';

import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from "./components/App";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import Kernel from "../src";

// setup a a testing vue instance
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

// Setup the mounted App
const wrapper = mount(App,
    {
        localVue,
        router,
        store
    }
);

test('hit dashboard route and redirect back to login if not logged in', () => {

    router.push('/dashboard').catch(err => {});

    // check that it is redirected back to login
    expect(wrapper.vm.$route.path).toBe('/login');

    localVue.nextTick(() => {
        // check that App component is correctly loaded
        const appCompnent = wrapper.find(App);
        expect(appCompnent.is(App)).toBe(true);

        // check that the dashboard component is not loaded
        expect(wrapper.contains(Dashboard)).toBe(false);

        // check that the login component is loaded after redirect
        const loginComponent = wrapper.find(Login);
        expect(loginComponent.is(Login)).toBe(true);
        expect(loginComponent.text()).toBe('This is the login');
    })
});

test('hit dashboard route and proceed if logged in', () => {
    store.state['loggedIn'] = true;
    router.push('/dashboard').catch(err => {});

    // check that it is redirected back to login
    expect(wrapper.vm.$route.path).toBe('/dashboard');

    localVue.nextTick(() => {
        // check that App component is correctly loaded
        const appCompnent = wrapper.find(App);
        expect(appCompnent.is(App)).toBe(true);

        // check that the login component is not loaded
        expect(wrapper.contains(Login)).toBe(false);

        // check that the dashboard component is loaded after redirect
        const dashboardComponent = wrapper.find(Dashboard);
        expect(dashboardComponent.is(Dashboard)).toBe(true);
        expect(dashboardComponent.text()).toBe('This is the dashboard');
    })
});

