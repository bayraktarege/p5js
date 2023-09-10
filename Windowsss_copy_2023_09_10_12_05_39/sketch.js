let f = 0;
function setup() {
  createCanvas(500, 500);
  list = new LinkedList(2000);
}

function draw() {
  background(0);
  for (let rectangl of list.lis) {
    if (1 == 0){
      
      list.del(rectangl);
      list.insert();
    }
        
    rectangl.flip(f);
    //list.delete(rectangl)
    //list.lis.pop()
    //list.lis.push(new Rectangle())
  }
  f += 0.01;
}

class Rectangle {
  constructor() {
    this.prev = false;
    this.next = false;
    this.x = random(width);
    this.y = random(height);
    this.wide = random(0, width / 10);
    this.high = random(0, height / 10);
    this.r = random(255);
    this.g = //random(255);
    this.b = //random(255);
    this.f = random(TWO_PI);
    this.a = random(255)
    this.curv = 0
    this.globalf = this.f
    //this.index = index
  }

  flip(f) {
    if (f == 0) {
      //this.r = random(255);
      //this.g = random(255);
      //this.b = random(255);
    }
    fill(this.r, this.g, this.b, this.a);
    noStroke()
    //stroke(this.a, this.g, this.b, this.r);
    let wide = this.wide * sin(f + this.f);
    let high = this.wide * cos(this.f);
    rect(this.x, this.y, wide, high, this.curv);
    if (this.next != false) {
      this.next.f += 0.01;
      this.prev.r = 150*sin(this.f**noise(f));
      this.prev.g = 100*cos(this.f*sin(f))
      this.prev.b = 150*sin(this.f*cos(f))
      this.prev.curv = 6*sin(this.f) + 6
      this.prev.a = 255 * cos(this.f) + 255
    
    this.globalf += f
    }
  }
}

class LinkedList {
  constructor(numb) {
    this.lis = [];
    this.head = 0;
    this.tail = 0;
    for (let i = 0; i <= numb; i++) {
      let rec = new Rectangle(i);
      if (i => 1) {
        rec.prev = this.lis[i - 1];
      }

      this.lis.push(rec);
    }
    for (let j = 0; j < numb; j++) {
      this.lis[j].next = this.lis[j + 1];
    }

    this.head = this.lis[0];
    this.tail = this.lis[numb];
    this.lis[numb].next = this.lis[0];
    this.lis[0].prev = this.lis[numb];
    print(this.head, this.tail)
  }

  search(k) {
    let x = this.head;
    while (k != x && x != this.tail && x.next != this.head) {
      // circular list

      x = x.next;

    return x;
    }
  }
  insert(rectangle) {
    let x = new Rectangle();
    this.tail.next = x;
    this.head.prev = x;
    x.next = this.head;
    x.prev = this.tail;
    this.head = x;
    this.lis.push(x);
  }
  del(k) {
    let x = this.search(k);
    //print(x.index);
    let prev = x.prev;
    let next = x.next;
    prev.next = x.next;
    next.prev = x.prev;
    this.lis.pop(x);
    x.next = false;
    x.prev = false;
    print("deleted")
    
  }
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === "s") {
    saveGif("mySketch", 1, {units:"frames"});
  }
}
