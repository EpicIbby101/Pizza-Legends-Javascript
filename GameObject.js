class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0; // index to keep track of which behaviour we're currently on

  }

  mount(map) {
    console.log("mounting!")
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // if we have a behaviour, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map); // call in new method and pass in the map state
    }, 10)
  }

  update() {
  }

  async doBehaviorEvent(map) {

    // don't do anything if there is a more important cutscene or event
    // or I don't have config to do anything anyway
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
      return;
    } 

    // setting up event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]; // identify method
    eventConfig.who = this.id;

    // create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init(); // await is used to wait for a promise, only used inside an async function. 
    // the code does not continue until the promise is settled.

    // setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    // do it again
    this.doBehaviorEvent(map);


  }

}