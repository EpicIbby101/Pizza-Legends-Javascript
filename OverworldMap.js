class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }
}
// lowerSrc for objects on "Back layer"
// upperSrc for objects on "Front layer"
// these allow for two different images to be drawn at a certain time

window.OverworldMaps = {
    DemoRoom: {
      lowerSrc: "/images/maps/DemoLower.png",
      upperSrc: "/images/maps/DemoUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
         /* npc1: new Person({
          x: utils.withGrid(7),
          y: utils.withGrid(9),
          src: "/images/characters/people/npc1.png"
        }) */
      }
    },
    Kitchen: {
      lowerSrc: "/images/maps/KitchenLower.png",
      upperSrc: "/images/maps/KitchenUpper.png",
      gameObjects: {
        hero: new GameObject({
          x: 5,
          y: 6,
        }),
        /* npcA: new GameObject({
          x: 9,
          y: 6,
          src: "/images/characters/people/npc2.png"
        }),
        npcB: new GameObject({
          x: 10,
          y: 8,
          src: "/images/characters/people/npc3.png"
        }) */
      }
    },
  }
// ^^ Object of all the different maps of the game ^^
// configuation of all the different maps can be found in here