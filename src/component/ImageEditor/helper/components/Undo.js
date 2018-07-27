import Component from "../interface/component";
import conts from '../consts';

export default class Undo extends Component {
    constructor (graphics) {
        super(conts.componentNames.UNDO, graphics)
    }

    start () {
        this.graphics.componentStack.undo()
    }
}
