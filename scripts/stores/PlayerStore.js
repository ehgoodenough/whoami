var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")
var LoopActions = require("<root>/scripts/actions/LoopActions")
var SmokeActions = require("<root>/scripts/actions/SmokeActions")

var PlayerStore = Reflux.createStore({
    data: {},
    getInitialState: function() {
        return this.data
    },
    listenables: [
        PlayerActions,
        PlaythroughActions,
        LoopActions
    ],
    onBeginPlaythrough: function(data) {
        this.data = {}
        for(var index = 0; index < data.players; index++) {
            this.data[index] = {
                x: Math.floor(Math.random() * (20 - 2) + 1),
                y: Math.floor(Math.random() * (15 - 2) + 1),
                radius: 0.5,
                scale: 1,
                velocity: 1,
                direction: "south",
                attacking: 0,
                status: 1,
                touches: [],
                hasBomb: true,
                id: index
            }
        }
        this.trigger(this.data)
    },
    onQuitPlaythrough: function() {
        this.data = {}
        this.trigger(this.data)
    },
    onTick: function(delta) {
        for(var index in this.data) {
            var player = this.data[index]
            if(player.attacking > 0) {
                player.attacking -= delta
            }
            if(player.attacking < 1) {
                if(player.status != 2) {
                    player.scale = 1
                }
            }
        }
        this.trigger(this.data)
    },
    onPlayerMoveNorth: function(id, delta) {
        var player = this.data[id]
        if(player && player.status != 0) {
            player.direction = "north"
            player.y -= (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerMoveSouth: function(id, delta) {
        var player = this.data[id]
        if(player && player.status != 0) {
            player.direction = "south"
            player.y += (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerMoveEast: function(id, delta) {
        var player = this.data[id]
        if(player && player.status != 0) {
            player.direction = "east"
            player.x += (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerMoveWest: function(id, delta) {
        var player = this.data[id]
        if(player && player.status != 0) {
            player.direction = "west"
            player.x -= (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerAttack: function(id) {
        var player = this.data[id]
        if(player && player.status != 0) {
            if(player.attacking <= 0) {
                player.attacking = 1.5
                player.scale = 2
                var attacked = false
                for(var index in this.data) {
                    if(id != index) {
                        if(this.data[index].status == 1) {
                            if(this.PlayerCanAttack(id, index)) {
                                PlayerActions.PlayerDies(index)
                                attacked = true
                            }
                        }
                    }
                }
                if(attacked) {
                    new Audio("./sounds/ahoo.mp3").play()
                } else {
                    new Audio("./sounds/hoo.mp3").play()
                }
                this.trigger(this.data)
            }
        }
    },
    PlayerCanAttack: function(p1id, p2id) {
        var player1 = this.data[p1id]
        var player2 = this.data[p2id]
        var x = player1.x - player2.x
        var y = player1.y - player2.y
        var d = Math.sqrt(x * x + y * y)
        var l = (player1.radius * 2) + player2.radius
        return d < l
    },
    onPlayerTouchStatue: function(id, sid) {
        var player = this.data[id]
        if(player && player.touches.indexOf(sid) == -1) {
            player.touches.push(sid)
            if(player.touches.length == 3) {
                player.scale = 2
                player.status = 2
                player.velocity = 1.5
            }
            new Audio("./sounds/ding.wav").play()
            for(var i = 1; i < player.touches.length; i++) {
                setTimeout(function() {
                    new Audio("./sounds/ding.wav").play()
                }, i * player.touches.length * 100)
            }
            this.trigger(this.data)
        }
    },
    onPlayerDropBomb: function(id) {
        var player = this.data[id]
        if(player && player.hasBomb) {
            player.hasBomb = false
            SmokeActions.CreateSmoke(player)
            this.trigger(this.data)
        }
    },
    onPlayerDies: function(id) {
        var player = this.data[id]
        if(player) {
            this.data[id].status = 0
            this.trigger(this.data)
        }
    }
})

module.exports = PlayerStore
