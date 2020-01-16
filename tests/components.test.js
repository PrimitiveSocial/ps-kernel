import Login from "./Login";
import Dashboard from "./Dashboard";
import {mount} from "@vue/test-utils";

test('mount the login component', () => {
    const wrapper = mount(Login);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toBe("This is the login");
});

test('mount the dashboard component', () => {
    const wrapper = mount(Dashboard);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toBe("This is the dashboard");
});