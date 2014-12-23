var PlayerActions = require("<root>/scripts/actions/PlayerActions")

var PlayerStore = Reflux.createStore({
    data: {
        "1": {
            x: 1,
            y: 1,
            radius: 0.5,
            velocity: 0.1,
            touches: []
        },
        "2": {
            x: 10,
            y: 10,
            radius: 0.5,
            velocity: 0.1,
            touches: []
        }
    },
    getInitialState: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
    onMoveHorizontally: function(id, x) {
        this.data[id].x = x
        this.trigger(this.data)
    },
    onMoveVertically: function(id, y) {
        this.data[id].y = y
        this.trigger(this.data)
    },
    onTouchStatue: function(id, sid) {
        if(this.data[id].touches.indexOf(sid) == -1) {
            this.data[id].touches.push(sid)
            console.log("ping")
            if(this.data[id].touches.length == 3) {
                console.log("you win!")
            }
        }
    }
})

module.exports = PlayerStore
