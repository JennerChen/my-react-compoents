// const fabric = require('fabric').fabric;
import {fabric} from 'fabric';
console.log(fabric);

let canvas = new fabric.Canvas('c', {
	backgroundColor: '#efefef',
	selection: false
});

// create a rectangle object
let rect = new fabric.Rect({
	left: 100,
	top: 100,
	fill: 'red',
	width: 20,
	height: 20,
	angle: 50
});
let circle = new fabric.Circle({
	radius: 20, fill: 'green', left: 200, top: 200
});
let path = new fabric.Path('M 0 0 L 300 100 L 200 300 z',
	{fill: 'none', stroke: 'green', opacity: 0.5, strokeWidth: 5});

let font = new fabric.Text('This is my first fabric text',{
	fontFamily: "Times New Roman"
})
// "add" rectangle onto canvas
canvas.add(rect);
canvas.add(circle);
canvas.add(path);
canvas.add(font);
path.animate('left', '+=100', { onChange: ()=> canvas.renderAll() });