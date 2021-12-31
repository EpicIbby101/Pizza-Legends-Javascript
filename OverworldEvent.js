class OverworldEvent {
    constructor({ map, event}) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {

    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({}, {
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
        })

        // set up a handler to complete when correct person is done walking, then resolve event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler)
    }
    // when the OverworldEent class sees the "PersonWalkingComplete" event fire off
    // then the walk(resolve) will be resolved

    init() {
        return new Promise(resolve => {
            this[this.event.type] (resolve)
        })
    }
}