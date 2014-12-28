var LoopActions = require("<root>/scripts/actions/LoopActions")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")
var ViewActions = require("<root>/scripts/actions/ViewActions")

var PlaythroughStore = Reflux.createStore({
    listenables: [
        PlaythroughActions,
        LoopActions,
        PlayerActions
    ],
    onBeginPlaythrough: function(data) {
        ViewActions.ChangeTo("PlaythroughView")
        this.data = {
            dead_players: 0,
            players: data.players,
            finished: false,
            message: ""
        }
    },
    onFinishPlaythrough: function() {
        this.data.finished = true
        this.data.message = "Game Over!"
        this.trigger(this.data)
    },
    onPlayerDies: function(id) {
        this.data.dead_players += 1
        if(this.data.dead_players == this.data.players - 1) {
            PlaythroughActions.FinishPlaythrough()
        }
    },
    getInitialState: function() {
        return this.data
    }
})

module.exports = PlaythroughStore
