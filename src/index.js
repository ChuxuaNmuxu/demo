const {log} = console;

class Branch {
    static a = 1;

    constructor (x) {
        this.x = x;
    }

    double () {
        return this.x * this.x ;
    }

    show () {
        return 'branch'
    }

    showBranch () {
        return 'branch'
    }
}

const branch1 = new Branch(0);
const branch2 = new Branch(1);

log(branch1.x)
log(branch2.x)

class Leaf1 extends Branch {
    constructor (x, y) {
        super('超自然现象');
        console.log('leaf1', super.a)
        this.y = y;
    }

    show () {
        return 'leaf1, ' + this.x
    }
}

class Leaf2 extends Branch {
    constructor (x, y) {
        super(x);
        console.log('left2', this)

        this.y = y;
    }

    show () {
        return 'leaf2, ' + this.x
    }
}

const leaf = new Leaf1(3, 1);
const leaf1 = new Leaf1(2, 7);
const leaf2 = new Leaf2(3, 1);

log(leaf.show())
log(leaf1.show())
log(leaf2.show())
log(leaf2.showBranch())




