import Component from '../interface/component';
import consts from '../consts';

export default class Arrow extends Component {
    polygonVertex = []
    startPoint = {}
    endPoint = {}
    angle = 0

    CONST = {
        edgeLen: 50,
        angle: 25
    };

    constructor(graphics) {
        super(consts.componentNames.ARROW, graphics)
    }

    start() {
        const canvas = this.getCanvas();

        canvas.on({
            'mouse:down': this.fabricMouseDown
        });
    }

    end () { 
        const canvas = this.getCanvas();

        this._isSelected = false;

        canvas.defaultCursor = 'default';

        canvas.selection = true;
        canvas.uniScaleTransform = false;
        canvas.off({
            'mouse:down': this._handlers.mousedown
        });

        fabric.util.removeListener(document, 'keydown', this._handlers.keydown);
        fabric.util.removeListener(document, 'keyup', this._handlers.keyup);
    }

    fabricMouseDown = (fEvent) => {
        const target = fEvent.target;

        if (!target) {
            const canvas = this.getCanvas();
            this.startPoint = canvas.getPointer(fEvent.e);

            canvas.on({
                'mouse:move': this.fabricMouseMove,
                'mouse:up': this.fabricMouseUp
            });
        }
    }

    fabricMouseMove = (fEvent) => {
        const canvas = this.getCanvas();
        this.endPoint = canvas.getPointer(fEvent.e);
        // const startPointX = this._startPoint.x;  
        // const startPointY = this._startPoint.y;
        // const width = startPointX - pointer.x;
        // const height = startPointY - pointer.y;

        this._shapeObj && this._shapeObj.remove();

        this.add()
    }

    fabricMouseUp = (fEvent) => {
        const canvas = this.getCanvas();
        const shape = this._shapeObj;

        if (shape) {
            // resizeHelper.adjustOriginToCenter(shape);
            this.graphics.componentStack.registryComponent(shape);
        }

        // this.fire(eventNames.ADD_OBJECT_AFTER, this.graphics.createObjectProperties(shape));

        canvas.off({
            'mouse:move': this.fabricMouseMove,
            'mouse:up': this.fabricMouseUp
        });

        this._shapeObj = null;
    }

    add () {
        const canvas = this.getCanvas();

        this.getArrowCoord();
        this.getSideCoord();

        const path = `M ${this.polygonVertex[0]} ${this.polygonVertex[1]}
         L ${this.polygonVertex[2]} ${this.polygonVertex[3]}
         L ${this.polygonVertex[4]} ${this.polygonVertex[5]}
         L ${this.polygonVertex[6]} ${this.polygonVertex[7]}
         L ${this.polygonVertex[8]} ${this.polygonVertex[9]}
         L ${this.polygonVertex[10]} ${this.polygonVertex[11]}
         z`

        const pathObject = new fabric.Path(path);

        canvas.add(pathObject);
        this._shapeObj = pathObject
    }


    //在CONST中定义的edgeLen以及angle参数
    //短距离画箭头的时候会出现箭头头部过大，修改：
    dynArrowSize () {
        var x = this.endPoint.x - this.startPoint.x,
            y = this.endPoint.y - this.startPoint.y,
            length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (length < 250) {
            this.CONST.edgeLen = this.CONST.edgeLen / 2;
            this.CONST.angle = this.CONST.angle / 2;
        }
        else if(length < 500){
            this.CONST.edgeLen = this.CONST.edgeLen * length / 500;
            this.CONST.angle = this.CONST.angle * length / 500;
        }
        // console.log(length);
    }


    paraDef (edgeLen, angle) {
        this.CONST.edgeLen = edgeLen;
        this.CONST.angle = angle;
    } 

    //getRadian 返回以起点与X轴之间的夹角角度值
    getRadian() {
        this.angle = Math.atan2(this.endPoint.y - this.startPoint.y, this.endPoint.x - this.startPoint.x) / Math.PI * 180;
        console.log(this.angle);
        this.paraDef(50, 25);
        this.dynArrowSize();
    }

    ///获得箭头底边两个点
    getArrowCoord () {
        this.polygonVertex[0] = this.startPoint.x;
        this.polygonVertex[1] = this.startPoint.y;
        this.polygonVertex[6] = this.endPoint.x;
        this.polygonVertex[7] = this.endPoint.y;
        this.getRadian();
        this.polygonVertex[8] = this.endPoint.x - this.CONST.edgeLen * Math.cos(Math.PI / 180 * (this.angle + this.CONST.angle));
        this.polygonVertex[9] = this.endPoint.y - this.CONST.edgeLen * Math.sin(Math.PI / 180 * (this.angle + this.CONST.angle));
        this.polygonVertex[4] = this.endPoint.x - this.CONST.edgeLen * Math.cos(Math.PI / 180 * (this.angle - this.CONST.angle));
        this.polygonVertex[5] = this.endPoint.y - this.CONST.edgeLen * Math.sin(Math.PI / 180 * (this.angle - this.CONST.angle));
    }

    //获取另两个底边侧面点
    getSideCoord () {
        var midpoint = {};
        // midpoint.x = this.polygonVertex[6] - (this.CONST.edgeLen * Math.cos(Plot.angle * Math.PI / 180));
        // midpoint.y = this.polygonVertex[7] - (this.CONST.edgeLen * Math.sin(Plot.angle * Math.PI / 180));
        midpoint.x=( this.polygonVertex[4] + this.polygonVertex[8] ) / 2;
        midpoint.y=( this.polygonVertex[5] + this.polygonVertex[9] ) / 2;
        this.polygonVertex[2] = (this.polygonVertex[4] + midpoint.x) / 2;
        this.polygonVertex[3] = (this.polygonVertex[5] + midpoint.y) / 2;
        this.polygonVertex[10] = (this.polygonVertex[8] + midpoint.x) / 2;
        this.polygonVertex[11] = (this.polygonVertex[9] + midpoint.y) / 2;
    }
}