import _ from 'lodash';

export default class ComponentStack {
    components = {};
    current = null;
    futureStack = [];
    pastStack = []
    id = 0

    constructor () {}

    getComponent (id) {
        return this.components[id]
    }

    getNewId () {
        return `$componenet-${this.id++}`
    }

    registryComponent (component, id) {
        id = id || this.getNewId();
        this.components[id] = component;
        this.pastStackAdd(id)
    }

    getCurrentComponent () {
        return this.current;
    }

    getPastStack () {
        return this.pastStack;
    }

    getFutureStack () {
        return this.futureStack;
    }

    pastStackAdd (id) {
        this.pastStack.push(id);
    }

    stackPop (id) {
        return this.componentStack.pop();
    }

    undo () {
        const id = this.pastStack.pop();
        this.futureStack.push(id);
        this.current = _.tail(this.pastStack);

        return this.getComponent(id);
    }

    redo () {
        const id = this.futureStack.pop();
        this.pastStack.push(id);
        this.current = _.tail(this.futureStack);

        return this.getComponent(id);
    }
}
