
// Detail level for drawing circles
// Maybe make dynamic based on circle radius?


class Drop {
  constructor(x, y, r) {
    // Center position of the drop
    this.center = createVector(x, y);
    // Radius of the drop
    this.r = r;
    // Calculate vertices based on circle detail and radius
    this.vertices = [];
    for (let i = 0; i < circleDetail; i++) {
      let angle = map(i, 0, circleDetail, 0, TWO_PI);
      let v = createVector(cos(angle), sin(angle));
      v.mult(this.r);
      v.add(this.center);
      this.vertices[i] = v;
    }
    // Random grayscale color
    this.col = random(0, 200);
    this.red = 0//random(255);
    this.green = 0//random(255);
    this.blue = 0//random(255);

    
    this.imagArray1 = [];
    this.imagArray2 = [];
    //this.images = images
    this.load = false;
    this.img = im;
    this.img2 = im;
    this.row = floor(random(64))
    this.f = random(TWO_PI)
    this.w = random(200);


}
loadpix(){
    for (let h = 0; h<subImageCount+1; h++){
        this.img = random(images)
        this.img2 = this.img
        
            for (let k = 0; k<=63; k++){
            //et pixels = this.img.get(k);
            //console.log(pixels))
            //let ind = k + this.row * 640;
            let col = this.img.get(k, this.row)//pixels[ind]
            let col2 = this.img2.get(k, this.row)//pixels[ind]

            this.imagArray1.push(col)
            this.imagArray2.push(col2)


        }
       
        //console.log(col)
        //console.log(col2)
    
}
    
}
updateImages(){
  this.imagArray1.splice(this.imagArray1.length-1, 1)
  if (this.imagArray2.length == 0){
      this.row = floor(random(64));
      this.img2 = this.img2//random(images)
      for (let k = 0; k<=63; k++){
          //et pixels = this.img.get(k);
          //console.log(pixels))
          //let ind = k + this.row * 640;
          let color2 = this.img2.get(k, this.row)//pixels[ind]
          this.imagArray2.push(color2)
      }
      

  } 
  this.imagArray1.splice(0,0,this.imagArray2[this.imagArray2.length-1])
  this.imagArray2.splice(this.imagArray2.length-1,1)
}




  // Apply a tine math
  // https://people.csail.mit.edu/jaffer/Marbling/Mathematics
  tine(m, x, y, z, c) {
    let u = 1 / pow(2, 1 / c);
    let b = createVector(x, y);
    for (let v of this.vertices) {
      let pb = p5.Vector.sub(v, b);
      let n = m.copy().rotate(HALF_PI);
      let d = abs(pb.dot(n));
      let mag = z * pow(u, d);
      v.add(m.copy().mult(mag));
    }
  }

  // Apply displacement from another drop
  // https://people.csail.mit.edu/jaffer/Marbling/Dropping-Paint
  marble(other) {
    for (let v of this.vertices) {
      let c = other.center;
      let r = other.r;
      let p = v.copy();
      p.sub(c);
      let m = p.mag();
      let root = sqrt(1 + (r * r) / (m * m));
      p.mult(root);
      p.add(c);
      v.set(p);
    }
  }

  show() {
    //fill(this.col);

    if (this.r > 0){

    extraCanvas.beginShape(TESS);
    for (let i = 0; i < this.vertices.length-1; i++) {
      let vi = this.vertices[i];
      let a = (TWO_PI/this.vertices.length)*i
      let color = this.imagArray1[i]//pixels[ind]
      if (color[3] == 0){
        this.imagArray1 = []
        this.loadpix()
        console.log(color[0])
      } else {
      this.red = lerp(this.red, color[0], 0.05*noise(i*0.01, sin(this.f)*0.1, this.f));
      this.green = lerp(this.green, color[1], 0.05*noise(i*0.01, sin(this.f)*0.1, this.f));
      this.blue = lerp(this.blue, color[2], 0.05*noise(i*0.01, sin(this.f)*0.1, this.f));
      
    }
    let zoff = sin(a) + 1
    let yoff = cos(a) + 1
    let r = map(noise(1*zoff*noise(yoff, zoff), 1*yoff*noise(yoff, zoff), time), 0, 1, 0, this.r)
    //extraCanvas.fill(this.red, this.green, this.blue, color[3]);
    extraCanvas.noFill()
    extraCanvas.strokeWeight(1)
    extraCanvas.stroke(this.red, this.green, this.blue, 150*noise(time*0.1*this.f, sin(this.f*0.1)*0.1, this.f))
    extraCanvas.vertex(cos(a)*r, sin(a)*r);
    //point(vi.x, vi.y, 1+this.r/10)
    this.f += this.w
    //this.r = this.r - 0.01;
  }
  extraCanvas.endShape(CLOSE);
    }
    
    
  }
}