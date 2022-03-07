let dx;
let yvalues;
let theta = 0.0;
var offset = 0;
var angle = 0.0;
var scalar = 40;
var speed = 0.05;
var sign = 1;

function preload(){
  img = loadImage('boat.png');
}

function setup() {
  createCanvas(800, 800);
  dx = (TWO_PI / 1000) * 4;
  yvalues = new Array(floor(width/2))
}

function draw() {
  background(0,48,47);
  calcWave();
  renderWave();
  drawBoat();
}

function calcWave(){
  theta += 0.02;
  let x = theta;
  for(let i =0; i < yvalues.length; i++){
    yvalues[i] = sin(x) *25.0;
    x += dx;
  }
}

function renderWave(){
  noStroke();
  fill(255);
  for (let x = 0; x <yvalues.length; x++){
    ellipse(x * 2, height * 1/4 + yvalues[x], 1, 1);
  }
}

function drawBoat() {
  // boat oscillation 
  var x1 = (((sin(angle) * scalar/0.4) + 40) * sign) + offset;
  var y1 = (sin(angle) * scalar/0.75) + 60;

  // change sign so it flips direction
  if(y1>113.315){
    sign *=(-1);
    if(sign == 1){ 
      offset = 0;
    }else{
      offset = 2*x1;
    }
  }
  // move picture
  image(img,x1,y1, 400,240);
  angle += speed;
}
