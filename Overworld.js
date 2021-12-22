class Overworld {
    constructor(config) { // creates an instance of a class
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }

    startGameLoop() {
      const step = () => {

        // cleans off the canvas
        this.ctx.clearRect (0, 0, this.canvas.width, this.canvas.height);

        // draw lower layer
        this.map.drawLowerImage(this.ctx);

        // draw game objects
        Object.values(this.map.gameObjects).forEach(object => {
          object.update({
            arrow: this.directionInput.direction

          }); // every frame that runs, char to more right by 0.5
          object.sprite.draw(this.ctx);
        })

        // draw upper layer
        this.map.drawUpperImage(this.ctx);

        requestAnimationFrame(() => {
        step();
      })
    }
      step();
    }
   
    init () {
      this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

      this.directionInput = new DirectionInput();
      this.directionInput.init();
      this.directionInput.direction; //"down"

      this.startGameLoop();
    }
  
    }
    // creating a new instance of overworld map, passing in the config data from demoroom
   