
// draw lines connecting the edges of a triangle. In every step reduce the vector spanning from two corners by a factor (inc variable) and draw a line between the point at the end of this vector and a point produced by the same principle in the previous step (of different corners). As you will be producing new corners, iterate through them as such: Step 1: x2, x3, x1. Step 2: x3, x1, x4. Step 3: x1, x4, x5. Please see ig: mostafaomarmk for beautiful shapes and designs he created with this principle. You will also gain a better visual understanding. I just tried to solve the principle underlying the basis.

let inc = 5 ;
let x1 = -200;
let y1 = 200;
let x3 = 0;
let y3 = -200;
let x2 = 200;
let y2 = 200;
let tri;
function setup() {
  createCanvas(400, 400);
  tri = new Triangle(x1,x2,x3,y1,y2,y3);
  tri2 = new Triangle(x1,0,-200,y1,-200,-200);
  tri3 = new Triangle(200,0,200,y1,-200,-200);
}

function draw() {
  background(220);
  translate(width/2, height/2);
  noLoop();
  strokeWeight(0.2);
  noFill();
  beginShape();
    tri.draw(150);
    tri2.draw(150);
    tri3.draw(150);
  endShape();
                              
}

// draw lines connecting the edges of a triangle. In every step reduce the vector spanning from two corners by a factor (inc variable) and draw a line between the point at the end of this vector and a point produced by the same principle in the previous step. 

class Triangle {
  
  constructor(x1, x2, x3, y1, y2, y3) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
  }
  draw(n) {
    
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    
    for (let i = 0; i<=n; i++) {

      let edge2 = createVector(this.x3-this.x2, this.y3-this.y2);

      //triangle(x1, y1, x2, y2, x3, x3);
      //let mag1 = edge1.mag();
      let mag2 = edge2.mag();
      let x = this.x2;
      let y = this.y2;
      edge2.setMag(mag2*inc/100);
      strokeWeight(0.4);
      stroke(0);
      line(this.x1, this.y1, this.x2 + edge2.x, this.y2 + edge2.y);
      this.x2 = this.x3;
      this.y2 = this.y3;
      this.x3 = this.x1;
      this.y3 = this.y1;
      this.x1 = x + edge2.x; 
      this.y1 = y + edge2.y;
   
  
    
    }
     
    
  }
  
}


function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveFrames('mySketch', "jpeg", 1, 1);
    //saveCanvas("bezier", "jpg");
  }
}