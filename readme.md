![GitHub Workflow Status](https://img.shields.io/github/workflow/status/PrimitiveSocial/ps-kernel/NodeCI)
[![CodeFactor](https://www.codefactor.io/repository/github/primitivesocial/ps-kernel/badge)](https://www.codefactor.io/repository/github/primitivesocial/ps-kernel)
![downloads](https://img.shields.io/npm/dt/@primitivesocial/ps-kernel)
![downloads](https://img.shields.io/npm/v/@primitivesocial/ps-kernel)
![min-size](https://img.shields.io/bundlephobia/min/@primitivesocial/ps-kernel/1.0.0)
![license](https://img.shields.io/github/license/PrimitiveSocial/ps-kernel)

A middleware system for Vue-router and Vuex

## Installation
```
npm i @primitivesocial/ps-kernel --save
```

## Configuration
In your app.js file, import the Vue router, Vuex and define the router as any vuex/vue-router app: 
```js
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
const router = new VueRouter(...);
```

Import the kernel and add it to the vue-router beforeEach hook.
```js
import Kernel from "@primitivesocial/ps-kernel";

router.beforeEach((to, from, next) => {
    let kernel = new Kernel(to, next, store);
    kernel.run();
});
```

## Usage
Middlewares are simply ES6 exported functions. The function accepts a destructred object as parameter, which contains the store instance, a next function and a redirect function. **The redirect function accepts a route as parameter.**

```js
//auth.js middleware file
export default function auth ({ store, redirect, next }){

    if(!store.getters['user/id']){
        return redirect({ name: 'Login' }); // You can pass a route object with parameters: `{ name: 'user', params: { id: userId } }`
    }

    //proceed the request
    return next();
}
```

And in your route definitions, add it inside tge middleware meta field: 
```js
import auth from "./auth";

let routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            middleware: [
                auth,
            ]
        },
    },
]
```

The middleware meta field accepts an array, which means, you can add multiple middleware per route :fire: :fire:

## Author & Contribution
Hey, I'm Elie Andraos, a web developer at [Primitive Social](https://twitter.com/PrimitiveSocial).
Pull requests are always welcome. For major changes, please open an issue first to discuss what you would like to change.
You can also [reach me out on twitter](https://twitter.com/andzilla31) for any question! 