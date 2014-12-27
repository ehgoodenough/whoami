var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")
var ViewActions = require("<root>/scripts/actions/ViewActions")

var PlaythroughView = require("<root>/scripts/views/PlaythroughView")
var TitleView = require("<root>/scripts/views/TitleView")

var PlaythroughStore = Reflux.createStore({
    listenables: [
        PlaythroughActions,
        PlayerActions
    ],
    onBeginPlaythrough: function(data) {
        ViewActions.ChangeTo(PlaythroughView)
        this.data = {
            dead_players: 0,
            players: data.players
        }
    },
    onFinishPlaythrough: function(data) {
        ViewActions.ChangeTo(TitleView)
        delete this.data
    },
    onDie: function() {
        this.data.dead_players += 1
        if(this.data.dead_players == this.data.players) {
            PlaythroughActions.FinishPlaythrough()
        }
    }
})

module.exports = PlaythroughStore
