var PlayerActions = require("./PlayerActions")

var PlayerStore = Reflux.createStore({
    data: {
        "1": {
            x: 1,
            y: 1,
            radius: 0.5,
            velocity: 0.1
        },
        "2": {
            x: 10,
            y: 10,
            radius: 0.5,
            velocity: 0.1
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
})

module.exports = PlayerStore
