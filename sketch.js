let dx;
let yvalues;
let theta = 0.0;

function setup() {
  createCanvas(400, 400);
  dx = (TWO_PI / 1000) * 4;
  yvalues = new Array(floor(width/2))
}

function draw() {
  background(0,48,47);
  calcWave();
  renderWave();
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