//TODO: with simple circle blur straight forward.

var particles = [];
var n = 20000;//number of particle
let r = 0;
let img;
let img2;
let canvas;
let spots = [];
var parlife = 100;
function preload(){
  img = loadImage("0067.png");
  img.loadPixels;
  img2 = loadImage("GEB.png")
  img2.loadPixels;
}

function setup() {
  
  createCanvas(img2.width, img2.height);
  img.resize(width, height);
  canvas = createGraphics(width, height)
  canvas.background(0);
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let c = img2.get(x, y);
      let b = c[0];
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
  //image(img, 0, 0);
  //generate noise image
  
  //initialize particle
  for(var i=0; i<n; i++){
    var particle = new Particle(spots, parlife);
    
    particles.push(particle);//add particle to particle list
  }
}


//get gradient vector
function curl(x, y, imaj){
  var EPSILON = 10;//sampling interval
  //Find rate of change in X direction
  //var n1i = floor(x + EPSILON + y * img.width);
  //var n2i = floor(x - EPSILON + y * img.width);
  var n1 = imaj.get(constrain(x + EPSILON, 0, img.width), y);
  var n2 = imaj.get(constrain(x - EPSILON, 0, img.width), y);
  //Average to find approximate derivative
  var cx = (n1[1] - n2[1])/(2 * EPSILON);

  //Find rate of change in Y direction
  //n1i = floor(x + (y+EPSILON) * img.width);
  //n2i = floor(x + (y-EPSILON) * img.width);
  n1 = imaj.get(x, constrain(y + EPSILON, 0, img.height));
  n2 = imaj.get(x, constrain(y - EPSILON, 0, img.height));

  //Average to find approximate derivative
  var cy = (n1[1] - n2[1])/(2 * EPSILON);
  
  //return new createVector(cx, cy);//gradient toward higher position
  return new createVector(cy, -cx);//rotate 90deg
}

function draw() {
  
  //background(0);
  //translate(width/2, height/2)
  //image(img, 0, 0);
  image(canvas, 0, 0);
  tint(255, 3);
  //image(noiseImg, 0, 0);//fill with transparent noise image
  //fill(0, 4);
  //rect(0, 0, width, height);
  
 
  
  
  for(var i=0; i<particles.length; i++){
    var p = particles[i];//pick a particle
    p.applyForce(curl(p.pos.x, p.pos.y, img));
    p.updateColor(img2.get(p.pos.x, p.pos.y));
    //console.log(curl(p.pos.x, p.pos.y));
    p.show(r);
    if (p.life > parlife){
      particles.splice(i, 1);
      var par = new Particle(spots, parlife);
      particles.push(par);
    }
    r += 0.000001
  }
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('mySketch', 5, {units:"seconds", delay: 0});
    //saveCanvas(canvas, "brriee.jpg")
  }
}

