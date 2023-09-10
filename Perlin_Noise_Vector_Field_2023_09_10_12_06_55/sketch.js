var inc = 0.1;
var scl = 10;
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var n = 300;
var flowfield;
let extraCanvas;

function setup() {
  createCanvas(800, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");
  flowfield = new Array(cols*rows);
  extraCanvas = createGraphics(width, height);
  extraCanvas.clear();
  for (var i = 0; i <= n; i++) {
    particles[i] = new Point();
  }
  
}

function draw() {
  background(0);
  image(extraCanvas, 0, 0);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.1)
      flowfield[index] = v;
      xoff += inc;
      //stroke(0, 50);
      //strokeWeight(1)
      //push();
      //translate(x * scl, y * scl);
      //rotate(v.heading());
      //line(0,0,scl,0);
      //fill(r);
      //rect(x*scl, y*scl, scl,scl);
      //pop();
    }
    for (let par of particles) {
        par.update(flowfield);
        //console.log(par)
        par.show();
    }
    yoff += inc;
    zoff += 0.0001
  }
  fr.html(floor(frameRate()))
}

function Point() {
    this.pos = createVector(0,0);
    this.vel = createVector(0,0);//p5.Vector.random2D();
    this.acc = createVector(0,0);
    this.maxspeed = random(0.1, 0.5);

    this.update = function(vectors) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed)
        this.pos.add(this.vel);
        this.acc.mult(0);
        var x = floor (this.pos.x / scl);
        var y = floor (this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.show = function() {
      
        let r = sin(zoff*10) * 255 + 255
        let g = cos(zoff*10) * 255 + 255
        let b = sin(zoff*10*this.pos.x) * 255 + 255
        extraCanvas.stroke(r, g, b, 5);
        extraCanvas.strokeWeight(1)
        extraCanvas.point(this.pos.x, this.pos.y);
    }

}
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('mySketch', 1, {units:"frames", delay: 5});
    saveCanvas("bezier", "jpg")
  }
}