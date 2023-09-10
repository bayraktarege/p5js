let z = 2;
function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);
  translate(width / 2, height / 3);
  strokeWeight(1);
  noLoop();
  //stroke(255);
  //line(0,0,200,200);
  noFill();
  beginShape();
  for (let i = 1; i <= 10000; i += 1) {
    let n = i;
    let sequence = [];
    do {
      sequence.push(n);
      n = collatz(n);

      //console.log(n);
    } while (n != 1);

    sequence.push(1);
    sequence.reverse();

    let angle = 0;
    let len = 5;
    let x = 0;
    let y = 0;
    //resetMatrix();

    for (let j = 0; j < sequence.length; j++) {
      if (sequence[j] % 2 == 0) {
        angle += PI / sin(i) + 1;
      } else {
        angle -= PI / sin(i) + 1;
      }
      stroke(
        255 * sin(i) + 255,
        255 * cos(i * i) + 255,
        255 * sin(i * i) + 255,
        15
      );
      vertex(x + len * sin(angle), y + len * cos(angle));
      x += len * sin(angle);
      y += len * cos(angle);
    }
  }
  endShape(CLOSE);
  z += 1;
}

function collatz(n) {
  if (n % 2 == 0) {
    return n / 2;
  } else {
    return (3 * n + 1) / 2;
  }
}
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === "s") {
    saveFrames("mySketch", "jpeg", 1, 1);
    //saveCanvas("bezier", "jpg");
  }
}
