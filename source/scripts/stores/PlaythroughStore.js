var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var LoopActions = require("<scripts>/actions/LoopActions")

var PlaythroughStore = Reflux.createStore({
    data: new Object(),
    getData: function() {
        return this.data
    },
    listenables: [
        PlaythroughActions,
        PlayerActions,
        LoopActions,
    ],
    onBeginPlaythrough: function(data) {
        this.data = {
            count: 0,
            size: data.size,
            message: ""
        }
        this.retrigger()
    },
    onFinishPlaythrough: function() {
        this.data.message = "Game Over!"
        this.retrigger()
    },
    onPlayerDies: function(id) {
        this.data.count += 1
        if(this.data.count == this.data.size - 1) {
            PlaythroughActions.FinishPlaythrough()
        }
    }
})

module.exports = PlaythroughStore
