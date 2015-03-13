var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var LoopActions = require("<scripts>/actions/LoopActions")
var SmokeActions = require("<scripts>/actions/SmokeActions")

var isIntersecting = require("<scripts>/references/isIntersecting")

var PlayerStore = Reflux.createStore({
    data: new Object(),
    getData: function() {
        return this.data
    },
    listenables: [
        PlaythroughActions,
        PlayerActions,
        LoopActions
    ],
    onBeginPlaythrough: function(playthrough) {
        this.data = new Object()
        for(var id = 0; id < playthrough.size; id++) {
            this.data[id] = {
                id: id,
                x: Math.floor(Math.random() * (WIDTH - 2) + 1),
                y: Math.floor(Math.random() * (HEIGHT - 2) + 1),
                scale: 1,
                velocity: 1,
                direction: "south",
                status: "normal",
                touches: {},
                isAttacking: 0,
                hasBomb: true
            }
        }
        this.retrigger()
    },
    onQuitPlaythrough: function() {
        this.data = new Object()
        this.retrigger()
    },
    onTick: function(tick) {
        for(var id in this.data) {
            var player = this.data[id]
            player.isAttacking -= tick
            if(player.isAttacking < 1) {
                if(player.status != "awesome") {
                    player.velocity = 1
                    player.scale = 1
                }
            }
        }
        this.retrigger()
    },
    onPlayerMoveNorth: function(id, tick) {
        var player = this.data[id]
        if(player != undefined) {
            if(player.status != "dead") {
                player.y -= (player.velocity * tick)
                player.direction = "north"
                this.retrigger()
            }
        }
    },
    onPlayerMoveSouth: function(id, tick) {
        var player = this.data[id]
        if(player != undefined) {
            if(player.status != "dead") {
                player.y += (player.velocity * tick)
                player.direction = "south"
                this.retrigger()
            }
        }
    },
    onPlayerMoveEast: function(id, tick) {
        var player = this.data[id]
        if(player != undefined) {
            if(player.status != "dead") {
                player.x += (player.velocity * tick)
                player.direction = "east"
                this.retrigger()
            }
        }
    },
    onPlayerMoveWest: function(id, tick) {
        var player = this.data[id]
        if(player != undefined) {
            if(player.status != "dead") {
                player.x -= (player.velocity * tick)
                player.direction = "west"
                this.retrigger()
            }
        }
    },
    onPlayerAttack: function(id) {
        var player = this.data[id]
        if(player != undefined) {
            if(player.status != "dead"
            && player.isAttacking < 0) {
                player.scale = 2
                player.velocity = 2
                player.isAttacking = 1.5
                player.sound = new Audio("./assets/sounds/hoo.mp3")
                PlayerActions.PlayerHasAttacked(player)
                for(var oid in this.data) {
                    if(id != oid) {
                        var otherplayer = this.data[oid]
                        if(otherplayer.status == "normal") {
                            if(isIntersecting(player, otherplayer)) {
                                player.sound = new Audio("./assets/sounds/ahoo.mp3")
                                PlayerActions.PlayerDies(oid)
                            }
                        }
                    }
                }
                player.sound.play()
                this.retrigger()
            }
        }
    },
    onPlayerTouchStatue: function(id, sid) {
        var player = this.data[id]
        if(player != undefined) {
            if(!player.touches[sid]) {
                player.touches[sid] = true
                new Audio("./assets/sounds/ding.wav").play()
                if(Object.keys(player.touches).length == 4) {
                    PlayerActions.PlayerIsAwesome(id)
                    player.status = "awesome"
                    player.velocity = 2
                    player.scale = 2
                }
                this.retrigger()
            }
        }
    },
    onPlayerDropBomb: function(id) {
        var player = this.data[id]
        if(player != undefined) {
            if(player.hasBomb) {
                SmokeActions.CreateSmoke({
                    x: player.x,
                    y: player.y
                })
                player.hasBomb = false
                this.retrigger()
            }
        }
    },
    onPlayerDies: function(id) {
        var player = this.data[id]
        if(player != undefined) {
            this.data[id].status = "dead"
            this.retrigger()
        }
    }
})

module.exports = PlayerStore
