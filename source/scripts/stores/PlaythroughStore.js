var LoopActions = require("<scripts>/actions/LoopActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")
var ViewActions = require("<scripts>/actions/ViewActions")

var PlaythroughStore = Reflux.createStore({
    listenables: [
        PlaythroughActions,
        LoopActions,
        PlayerActions
    ],
    onBeginPlaythrough: function(data) {
        ViewActions.ChangeView("PlaythroughView")
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
        setTimeout(function() {
            PlaythroughActions.QuitPlaythrough()
        }, 5 * 1000)
    },
    onQuitPlaythrough: function() {
        ViewActions.ChangeView("TitlescreenView")
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
