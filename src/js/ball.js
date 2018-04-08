export default class Ball {
  constructor(x, y, power) {
    this.x = x || 0;
    this.y = y || 0;

    this.originalX = x || 0;
    this.originalY = y || 0;
    this.vx = 0;
    this.vy = 0;
    
    this.friction = 0.56;
    this.springFactor = 1;
    this.power = power || 6;

    this.maxSpeed = 3;

    this.diffX = 0;
    this.diffY = 0;
    this.radius = 200;

  }
  setPos(x,y) {
    this.x = x;
    this.y = y;
  }
  think(mouse) {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;

    let dist = Math.sqrt(dx*dx + dy*dy);
    // interaction

    if(dist<this.radius ) {
      let angle = Math.atan2(dy,dx);
      let norm = Math.sqrt(dx*dx + dy*dy);
      let tx = 0,ty = 0;
      if(norm>0) {
        tx = 2*dx/norm;
        ty = 2*dy/norm;
      }
      

      this.vx += -tx;
      this.vy += -ty;
    }

    // spring back
    let dx1 = -(this.x - this.originalX);
    let dy1 = -(this.y - this.originalY);
    let norm1 = Math.sqrt(dx1*dx1 + dy1*dy1);

    if(norm1>0) {
      this.vx += 2*this.power*norm1/this.radius*(dx1 * this.springFactor/norm1);
      this.vy += 2*this.power*norm1/this.radius*(dy1 * this.springFactor/norm1);
    }
    

        
    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;


    if(dist<2) {
      this.vx = 0;
      this.vy = 0;
    };
    // actual move
    this.x += this.vx;
    this.y += this.vy;

    this.diffX = this.x - this.originalX;
    this.diffY = this.y - this.originalY;
  }


}
