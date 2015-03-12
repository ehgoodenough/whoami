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
        for(var iterator = 0; iterator < 4; iterator++) {
            this.data[iterator] = {
                x: Math.floor(Math.random() * (WIDTH - 4) + 2),
                y: Math.floor(Math.random() * (HEIGHT - 4) + 2),
                scale: Math.floor(Math.random() * 5 + 13) / 10,
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
        for(var sid in this.data) {
            var statue = this.data[sid]
            statue.status = "awesome"
        }
        this.retrigger()
    }
})

module.exports = StatueStore
