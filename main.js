// Rose (mathematics) function.
// https://en.wikipedia.org/wiki/Rose_(mathematics)
//
// What is k, n, d variable?
// you can understand to see follow svg image.
// https://en.wikipedia.org/wiki/Rose_(mathematics)#/media/File:Rose-rhodonea-curve-7x9-chart-improved.svg
function rose(theta, n, d, amplitude) {
  var k = n / d;
  var x = amplitude * Math.cos(k * theta) * Math.cos(theta);
  var y = amplitude * Math.cos(k * theta) * Math.sin(theta);
  var coords = {"x" : x, "y" : y}
  return coords;
}

var total = []
var canvas, context, width, height, nodes;
var t = 0;
var p = 0;

var amplitude = 250;

// Steps
var theta_step = 0.01,
    anim_steps = 50;


function setup(callback) {
  // initialize canvas.
  canvas        = document.getElementById('c');
  context       = canvas.getContext('2d');
  width         = window.innerWidth;
  height        = window.innerHeight;
  canvas.width  = width;
  canvas.height = height;

  // point style
  context.strokeStyle = '#ED6099';

  while(t < 3000){
    var n = Math.PI * 1.8;
    var d = 12;
    var p = rose(t, n, d, amplitude);
    total.push([p.x, p.y]);

    t += 0.01;
  }
  context.translate(width/2, height/2); // reset screen

  callback();
}

function animate(){
  i = 0
  while(i<anim_steps){
    var x = total[p][0]
    var y = total[p][1]

    prev_x = x
    prev_y = y

    if(p>0){
      prev_x = total[p-1][0];
      prev_y = total[p-1][1]
    }

    context.lineWidth = 20*(1 - Math.sqrt(Math.pow(x,2) + Math.pow(y,2))/amplitude) // HUGO MOTHAFOCA
    context.beginPath();
    context.moveTo(prev_x, prev_y);
    context.lineTo(x, y);
    context.stroke();

    p++;
    i++;
  }

  setTimeout(animate, 4);
}

setup(animate);

function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

