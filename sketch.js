// wave vars
let dx;
let yvalues;
let theta = 0.0;
// boat vars
var offset = 0;
var angle = 0.0;
var scalar = 40;
var speed = 0.05;
var sign = 1;
// monster vars
let yInc = 0.002 //time
let xInc = 0.05; //angles
let xoff = 0;
let yoff = 0;
let count = 0;
let num = 8;
let arms = [];

function preload(){
  img = loadImage('boat.png');
  bg = loadImage('BG.png');
}

function setup() {
  createCanvas(800, 1000);
  dx = (TWO_PI / 1000) * 4;
  yvalues = new Array(floor(width/2));
  monsterSetup();
}

function monsterSetup(){ 
  //angleMode(DEGREES);
  for (let i = 0; i < num; i++) {
    // change to true to make it look normal
    arms[i] = new Line(40, random(-1000,1000), false);
  }
  zoff = 0;
}

function draw() {
  //background(0,48,47);
  background(bg);
  calcWave();
  renderWave();
  drawBoat();
  monster();
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
  fill(0);
  beginShape(TESS);
  vertex(0,0);
  for (let x = 0; x <yvalues.length; x++){
    vertex(x * 2, height * 1/4 + yvalues[x] - 60);
  }
  vertex(width,0);
  endShape();
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
  image(img,x1,y1, 400, 240);
  angle += speed;
}

// draw monster
function monster(){
  translate(width / 2, 650);
  for (let i = 0; i < arms.length; i++) {
    push();
    arms[i].show();
    count = 0;
    pop();
  }
  yoff += yInc;
  xoff = 0;
  count = 0;
}

// monster tessellations
var Line = function(d, seed, base) {
  this.d = d;
  this.seed = seed
  this.base = base;
}

Line.prototype.show = function() {
  xoff += xInc;
  noiseSeed(this.seed);
  if (this.base == true) {
    this.angle = map(noise(xoff, yoff), 0, 1, -360, 360);
  } else {
    this.angle = map(noise(xoff, yoff), 0, 1, -90, 90);
  }
  count++;
  stroke(map(count, 0 , 12, 0, 100));
  strokeWeight(2);
  rotate(radians(this.angle));
  strokeWeight(map(count, 0, 19, 50, 2));
  line(0, 0, 0, this.d);
  translate(0, this.d);
  if (count < 20) {
    new Line(this.d * 0.95, this.seed, false).show();
  }
}
