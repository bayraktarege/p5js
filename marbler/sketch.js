let drop;
let images = [];
let names = [];
let im;
let subimages = [];
let time = 0;
let inc = 0.01;

const circleDetail = 100;
const subImageCount = circleDetail%64+1;

function preload() {
  names = loadStrings("/songoooos.txt");
}

function setup() {
  createCanvas(1400, 1400, WEBGL);
  extraCanvas = createGraphics(width, height, WEBGL);
  extraCanvas.clear();
  drop = new Drop(0, 0, 600)
  for (let i = 0; i < names.length-1; i++){
    //console.log(names[i])
    images[i] = loadImage("/picsoooos/"+names[i]);
  }

 
  
  drop.loadpix()
  console.log(subImageCount)
}

function draw() {
  background(0);
  img = image(extraCanvas, -width/2, -height/2);
  drop.show();

  drop.updateImages();
  time += inc;
}


function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    //saveGif('ssySketch', 1, {units:"frames", delay: 5});
    //saveCanvas(extraCanvas, "uno.jpg");
    //save(img, "dos.png");
    //console.log(time)
    saveCanvas(img, "dos.png");
  }
}