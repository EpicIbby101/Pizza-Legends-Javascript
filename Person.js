class Person extends GameObject {
    constructor(config) {
        super(config); // will run the GameObject code too
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;
        // distinguishes player from npc, disabling double movement

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        this.updatePosition();

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition(){
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            // direction is a reference to GameObject which is an extension to direction from Gameobject file
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}