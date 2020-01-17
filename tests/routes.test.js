import {createLocalVue, mount} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Login from "./Login";
import Dashboard from "./Dashboard";

const localVue = createLocalVue();
localVue.use(VueRouter);

const routes = [
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
];

const router = new VueRouter({
    routes
});

test('mount the login component and check the route path', () => {
    const wrapper = mount(Login, {
        localVue,
        router
    });
    router.push('/login');
    expect(wrapper.vm.$route.path).toBe('/login');
    expect(wrapper.text()).toBe("This is the login");
});

test('mount the dashboard component and check the route path', () => {
    const wrapper = mount(Dashboard, {
        localVue,
        router
    });
    router.push('/dashboard');
    expect(wrapper.vm.$route.path).toBe('/dashboard');
    expect(wrapper.text()).toBe("This is the dashboard");
});