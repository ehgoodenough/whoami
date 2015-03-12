var PlayerStore = require("<scripts>/stores/PlayerStore")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")

var isIntersecting = require("<scripts>/references/isIntersecting")

var StatueStore = Reflux.createStore({
    data: new Object(),
    getData: function() {
        return this.data
    },
    init: function() {
        this.listenTo(PlaythroughActions.BeginPlaythrough, this.onBeginPlaythrough)
        this.listenTo(PlaythroughActions.QuitPlaythrough, this.onQuitPlaythrough)
        this.listenTo(PlayerStore, this.onPlayerStore)
        this.listenTo(PlayerActions.PlayerIsAwesome, this.onPlayerIsAwesome)
    },
    onBeginPlaythrough: function(playthrough) {
        this.data = {
            "A": {
                x: 5,
                y: 5,
                scale: 0.7*2,
                status: "normal"
            },
            "B": {
                x: 15,
                y: 3,
                scale: 0.8*2,
                status: "normal"
            },
            "C": {
                x: 11,
                y: 13,
                scale: 0.9*2,
                status: "normal"
            }
        }
        this.retrigger()
    },
    onQuitPlaythrough: function() {
        this.data = new Object()
    },
    onPlayerStore: function(data) {
        for(var sid in this.data) {
            var statue = this.data[sid]
            if(statue.status == "normal") {
                for(var pid in data) {
                    var player = data[pid]
                    if(isIntersecting(player, statue)) {
                        PlayerActions.PlayerTouchStatue(pid, sid)
                    }
                }
            }
        }
        this.retrigger()
    },
    onPlayerIsAwesome: function(pid) {
        console.log("it's done")
        for(var sid in this.data) {
            var statue = this.data[sid]
            statue.status = "awesome"
        }
        this.retrigger()
    }
})

module.exports = StatueStore
