import { observable } from 'mobx';

export class Store {
    @observable counter = 0;

    static rehydrate({ counter }) {
        const store = new Store();
        store.counter = counter;
        return store;
    }

    dehydrate() {
        return { counter: this.counter };
    }
}
