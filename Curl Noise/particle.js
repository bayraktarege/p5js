class Particle{
    constructor(spots, parlife){
        //var r = floor(random(spots.length));
        //var spot = spots[r];
        //this.x = spot.x;
        //this.y = spot.y;
        this.x = random(img.width);
        this.y = random(img.height);
        this.pos = createVector(this.x, this.y);
        this.maxforce = 1;
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        this.a = random(255);
        this.life = random(parlife);
        
    }

    applyForce(force){
        if (force.x == 0 && force.y == 0){
            var forc = createVector(0.1, 0.1);
            forc.limit(this.maxforce);
            this.pos.add(forc)
        } 
        else {
            force.limit(this.maxforce);
            this.pos.add(force)
        }
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;

        this.life +=1;
    }

    updateColor(color){
        this.r = color[0];//20;
        this.g = color[1];//20;
        this.b = color[2];//20;
        this.a = color[3];//20;
    }

    show(r){

        //colorMode(HSB, 100)

        //canvas.strokeWeight(1);//particle size
        //canvas.stroke(this.r, this.g, this.b, this.a);
        //canvas.point(this.pos.x, this.pos.y);
        strokeWeight(1);//particle size
        //stroke(cos((this.r*r)+1)*255, 
        //       sin((this.g*r)+1)*255, 
        //       cos((this.b*r)+1)*255, this.a);
        stroke(this.r, this.g, this.b, this.a);
        point(this.pos.x, this.pos.y);
    }
}