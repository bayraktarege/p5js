let f1 = 0;
let sample_size = 100;
let r = 200;
let phase;


function setup() {
  createCanvas(500, 500);
  phase = createSlider(0.0001, 0.001, 0, 0.0001)
}

function draw() {
  background(0);
  noFill()
  stroke(0)
  translate(width/2, height/2);
  let phi = PI * (3-sqrt(5));
  beginShape()
  vertex(0,0,0)
  
  for (let i = 1; i<=sample_size-1; i++) {
    
   
    
    let z = 1 - (i/(sample_size-1)) * 2;
    let radius = r * sqrt(1 - z * z);
    theta = phi * f1 * i;
    
    let rc = map(cos(i*f1), -1, 1, 0, 255);
    let gc = map(sin(i*f1), -1, 1, 0, 255);
    let bc = map(tan(i*f1), -1, 1, 0, 255);

    let x = cos(theta) * radius;
    let y = sin(theta) * radius;
    z *= r;
    
    
    vertex(x,y)
    stroke(rc, gc, bc, z)
    endShape(CLOSE)
  
  }
  
  stroke(0, 0)
  endShape(CLOSE)
  
f1 += phase.value()
  
}