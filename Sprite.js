class Sprite {
    constructor(config) {
  
      //Set up the image
      this.image = new Image();
      this.image.src = config.src;
      this.image.onload = () => { //'onload' excecutes a js script immediately after a page/ object loads
        this.isLoaded = true;
      }
  
      //Shadow
      this.shadow = new Image();
      this.useShadow = true; //config.useShadow || false
      if (this.useShadow) {
        this.shadow.src = "/images/characters/shadow.png";
      }
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      }
  
      //Configure Animation & Initial State
      this.animations = config.animations || {
        "idle-down": [ [0,0] ],
        "walk-down": [ [1,0], [0,0], [3,0], [0,0] ]
      }
      this.currentAnimation = "walk-down"; // config.currentAnimation || "idleDown";
      this.currentAnimationFrame = 0;

      this.animationFrameLimit = config.animationFrameLimit || 16; // number shows how many gameLoop frames we want to show one cut of the sprite sheet
      this.animationFrameProgress = this.animationFrameLimit;
  
      //Reference the game object
      this.gameObject = config.gameObject;
    }

    get frame() {
      return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    updateAnimationProgress() {
      //Downtick frame progress
      if (this.animationFrameProgress > 0) {
        this.animationFrameProgress -= 1;
        return;
      }
    }
  
    draw(ctx) {
      const x = this.gameObject.x - 8;
      const y = this.gameObject.y - 18;
  
      this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

      const [frameX, frameY] = this.frame;
  
      this.isLoaded && ctx.drawImage(this.image,
        frameX * 32, frameY * 32,
        32,32,
        x,y,
        32,32
      )
    }
  }
  // a constructor allows you to create and initialize an object instance of that class
  // 'this' refer to the object it belongs to 