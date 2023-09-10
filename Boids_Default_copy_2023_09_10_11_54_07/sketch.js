let swarm = [];
//let vec = createVector(0,0);

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 300; i++) {
    swarm.push(new Boid());
  }
}

function draw() {
  background(30);
  for (let bo of swarm) {
    bo.flock(swarm);
    bo.edges();
    bo.update();
    bo.show();
  }
}
class Boid {
    constructor(){
        this.perceptionRadius = 50;
        this.pos = createVector(random(width),random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(2, 6);
        this.acc = createVector();
        this.maxSpeed = 3;
        this.maxForce = 0.01;
        this.f = 0;
        this.r = 5;
        this.vision = 2;
        this.redd = (sin(this.f)+1)*255;
        this.g = (cos(this.f)+1)*255;
        this.b = (sin(this.f)+1)*255;
        this.st = 3
    }

    flock(boids) {
        let align = this.alignment(boids);
        this.acc.add(align);
        let separate = this.separation(boids);
        this.acc.add(separate);
        let cohesion = this.cohesion(boids);
        this.acc.add(cohesion);
        let rand = p5.Vector.random2D();
        rand.limit(this.maxForce*1)
        this.acc.add(rand);
    }

    update() {
        //this.edges();
        //this.flock(boids);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0)
        
    }

    edges() {
        if (this.pos.x > width) {
            this.vel.x = -this.vel.x;
        } else if (this.pos.x < 0) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y > height) {
            this.vel.y = -this.vel.y;
        } else if (this.pos.y < 0) {
            this.vel.y = -this.vel.y;
        }
    }

    // First steering force: Seperation
    separation(boids) {
        let perceptionRadius = 40;
        let avg = createVector(0,0);
        let total = 0;
        for (let other of boids) {
            let d = this.pos.dist(other.pos);
            if (other != this && d < perceptionRadius) {
                this.f -= 0.02
                this.redd = (cos(this.f)+1)*255;
                this.g = (cos(this.f)+1)*255;
                this.b = (sin(this.f)+1)*255;
                let angle = this.vel.angleBetween(other.vel);
                if (angle < PI / this.vision || angle > -PI / this.vision) {
                    let diff = p5.Vector.sub(this.pos, other.pos);
                    diff.div(d**d);
                    avg.add(diff);
                    total++
                }
            }
            
        }

        if (total > 0) {
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.vel);
            avg.limit(this.maxForce*5);
            
        }
        // what happens if total == 0?
        return avg;
    }

    // Second steering force: Alignment
    alignment(boids) {
        let perceptionRadius = 100;
        let avg = createVector(0,0);
        let total = 0;
        for (let other of boids) {
            let d = this.pos.dist(other.pos);
            if (other != this && d < perceptionRadius) {
                this.f += 0.001
                this.redd = (cos(this.f)+1)*255;
                this.g = (sin(this.f)+1)*255;
                this.b = (cos(this.f)+1)*255;
                let angle = this.vel.angleBetween(other.vel);
                if (angle < PI / this.vision || angle > -PI / this.vision) {
                    avg.add(other.vel);
                    total++
                }
                
            }
            
        }

        if (total > 0) {
            avg.div(total);
            avg.setMag(this.maxSpeed)
            avg.sub(this.vel);
            avg.limit(this.maxForce);
            
        }
        // what happens if total == 0?
        return avg;
    }
    // Third steering force: Cohesion
    cohesion(boids) {
        let perceptionRadius = 100;
        let avg = createVector(0,0);
        let total = 0;
        for (let other of boids) {
            let d = this.pos.dist(other.pos);
            if (other != this && d < perceptionRadius) {
                let angle = this.vel.angleBetween(other.vel);
                if (angle < PI / this.vision || angle > -PI / this.vision) {
                    avg.add(other.pos);
                    total++
                }
            }
            
        }

        if (total > 0) {
            avg.div(total);
            avg.sub(this.pos);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
            
        }
        // what happens if total == 0?
        return avg;
    }

    show() {
        stroke(this.redd, this.g, this.b);
        strokeWeight(this.st);
        fill(this.g, this.redd, this.b);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
        pop();
    }


}
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('mySketch', 10, {units:"seconds", delay: 5});
  }
}