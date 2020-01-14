import {redirect, next} from "./KernelHelper";

export default class Kernel
{
    middlewares; // array of defined middlewares in the Vue router file
    to; // "to" object in the beforeEach() Vue router hook
    next; // next() function in the beforeEach() Vue router hook
    store; // Vuex store instance

    constructor(objTo, fnNext, store) {
        this.to = objTo;
        this.next = fnNext;
        this.store = store;
        this.middlewares = (objTo.meta && objTo.meta.middleware) ? objTo.meta.middleware : [];
    }

    run() {
        if(typeof this.middlewares !== 'object') {
            this.next();
        }

        if(!this.middlewares.length) {
            this.next();
        }

        for(let index in this.middlewares) {
            let store = this.store;
            let route = this.middlewares[index]({store, redirect, next});
            if(route) {
                this.next(route);
                break;
            }
        }

        this.next();
    }
}
