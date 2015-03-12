var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var LoopActions = require("<scripts>/actions/LoopActions")

var isIntersecting = require("<scripts>/references/isIntersecting")

var NonplayerStore = Reflux.createStore({
    data: new Array(),
    getData: function() {
        return this.data
    },
    listenables: [
        PlaythroughActions,
        PlayerActions,
        LoopActions
    ],
    onBeginPlaythrough: function(playthrough) {
        this.data = new Array()
        var size = playthrough.size * 12.5
        for(var i = 0; i < size; i++) {
            this.data.push({
                x: Math.floor(Math.random() * (WIDTH - 2) + 1),
                y: Math.floor(Math.random() * (HEIGHT - 2) + 1),
                scale: 1,
                velocity: 1,
                direction: "south",
                status: "normal",
                angle: Math.floor(Math.random() * 8),
                destination: Math.floor(Math.random() * (5 - 1)) + 1,
                cooldown: Math.floor(Math.random() * 5)
            })
        }
        this.retrigger()
    },
    onQuitPlaythrough: function() {
        this.data = new Array()
        this.retrigger()
    },
    onPlayerHasAttacked: function(player) {
        for(var index in this.data) {
            var nonplayer = this.data[index]
            if(isIntersecting(player, nonplayer)) {
                nonplayer.status = "dead"
                nonplayer.respawn = 7.5
            }
        }
        this.retrigger()
    },
    onTick: function(tick) {
        for(var index in this.data) {
            var nonplayer = this.data[index]
            if(nonplayer.status == "dead") {
                nonplayer.respawn -= tick
                if(nonplayer.respawn < 0) {
                    nonplayer.respawn = 0
                    nonplayer.status = "normal"
                }
            } else {
                if(nonplayer.destination > 0) {
                    nonplayer.x += Math.cos(nonplayer.angle * (180 / Math.PI)) * (nonplayer.velocity * tick)
                    nonplayer.y += Math.sin(nonplayer.angle * (180 / Math.PI)) * (nonplayer.velocity * tick)
                    nonplayer.destination -= nonplayer.velocity * tick
                } else {
                    nonplayer.cooldown -= tick
                    if(nonplayer.cooldown <= 0) {
                        nonplayer.cooldown = Math.floor(Math.random() * 5)
                        nonplayer.destination = Math.floor(Math.random() * (5 - 1)) + 1,
                        nonplayer.angle = Math.floor(Math.random() * 8)
                    }
                }
                if(nonplayer.x <= 1 && nonplayer.angle >= 3 && nonplayer.angle <= 5
                || nonplayer.y <= 1 && nonplayer.angle >= 5 && nonplayer.angle <= 7
                || nonplayer.x >= 20 - 1 && (nonplayer.angle == 7 || nonplayer.angle <= 1)
                || nonplayer.y >= 15 - 1 && nonplayer.angle >= 1 && nonplayer.angle <= 3) {
                    nonplayer.angle = (nonplayer.angle + 4) % 8
                }
                if(nonplayer.angle == 0
                || nonplayer.angle == 7) {
                    nonplayer.direction = "east"
                } else if(nonplayer.angle == 6
                || nonplayer.angle == 5) {
                    nonplayer.direction = "north"
                } else if(nonplayer.angle == 4) {
                    nonplayer.direction = "west"
                } else if(nonplayer.angle == 3
                || nonplayer.angle == 2
                || nonplayer.angle == 1) {
                    nonplayer.direction = "south"
                }
            }
        }
        this.retrigger()
    }
})

module.exports = NonplayerStore
