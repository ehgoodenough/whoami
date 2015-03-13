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
        this.addStatue("A", WIDTH * 0.25, HEIGHT * 0.25)
        this.addStatue("B", WIDTH * 0.25, HEIGHT * 0.75)
        this.addStatue("C", WIDTH * 0.75, HEIGHT * 0.25)
        this.addStatue("D", WIDTH * 0.75, HEIGHT * 0.75)
        this.retrigger()
    },
    addStatue: function(id, x, y) {
        this.data[id] = {
            x: x,
            y: y,
            scale: Math.floor(Math.random() * 5 + 13) / 10,
            status: "normal"
        }
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
