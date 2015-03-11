var LoopActions = require("<scripts>/actions/LoopActions")
var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")

var NonplayerStore = Reflux.createStore({
    data: [],
    listenables: [
        PlaythroughActions,
        LoopActions
    ],
    onBeginPlaythrough: function(data) {
        this.data = []
        var amount = data.players * 12.5;
        if(data.players == 1) {
            amount = 0;
        }
        for(var i = 0; i < amount; i++) {
            this.data.push({
                x: Math.floor(Math.random() * (20 - 2) + 1),
                y: Math.floor(Math.random() * (15 - 2) + 1),
                radius: 0.5,
                velocity: 1,
                direction: "south",
                status: 1,
                gotocooldown: Math.floor(Math.random() * 5),
                gotodist: Math.floor(Math.random() * (5 - 1)) + 1,
                gotodir: Math.floor(Math.random() * 8)
            })
        }
        this.trigger(this.data)
    },
    onQuitPlaythrough: function(data) {
        this.data = []
        this.trigger(this.data)
    },
    onTick: function(delta) {
        for(var i = 0; i < this.data.length; i++) {
            var nonplayer = this.data[i]
            
            if(nonplayer.gotodist > 0) {
                nonplayer.x += Math.cos(nonplayer.gotodir * (180 / Math.PI)) * (nonplayer.velocity * delta)
                nonplayer.y += Math.sin(nonplayer.gotodir * (180 / Math.PI)) * (nonplayer.velocity * delta)
                nonplayer.gotodist -= nonplayer.velocity * delta
            } else {
                nonplayer.gotocooldown -= delta
                if(nonplayer.gotocooldown <= 0) {
                    nonplayer.gotocooldown = Math.floor(Math.random() * 5)
                    nonplayer.gotodist = Math.floor(Math.random() * (5 - 1)) + 1,
                    nonplayer.gotodir = Math.floor(Math.random() * 8)
                }
            }
            
            if(nonplayer.x <= 1 && nonplayer.gotodir >= 3 && nonplayer.gotodir <= 5
            || nonplayer.y <= 1 && nonplayer.gotodir >= 5 && nonplayer.gotodir <= 7
            || nonplayer.x >= 20 - 1 && (nonplayer.gotodir == 7 || nonplayer.gotodir <= 1)
            || nonplayer.y >= 15 - 1 && nonplayer.gotodir >= 1 && nonplayer.gotodir <= 3)
            {
                nonplayer.gotodir = (nonplayer.gotodir + 4) % 8
            }
            
            if(nonplayer.gotodir == 0
            || nonplayer.gotodir == 7) {
                nonplayer.direction = "east"
            } else if(nonplayer.gotodir == 6
            || nonplayer.gotodir == 5) {
                nonplayer.direction = "north"
            } else if(nonplayer.gotodir == 4) {
                nonplayer.direction = "west"
            } else if(nonplayer.gotodir == 3
            || nonplayer.gotodir == 2
            || nonplayer.gotodir == 1) {
                nonplayer.direction = "south"
            }
        }
        this.trigger(this.data)
    },
    getInitialData: function() {
        return this.data
    }
})

module.exports = NonplayerStore
