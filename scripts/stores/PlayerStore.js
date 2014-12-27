var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")
var LoopActions = require("<root>/scripts/actions/LoopActions")

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
                x: Math.floor(Math.random() * (20 - 2) + (2 / 2)),
                y: Math.floor(Math.random() * (15 - 2) + (2 / 2)),
                radius: 0.5,
                velocity: 1,
                direction: "south",
                cooldown: 0,
                status: 1,
                touches: []
            }
        }
        this.trigger(this.data)
    },
    onTick: function(delta) {
        for(var index in this.data) {
            var player = this.data[index]
            if(player.cooldown > 0) {
                player.cooldown -= delta;
            }
        }
    },
    onPlayerMoveNorth: function(id, delta) {
        var player = this.data[id]
        if(player.status != 0) {
            player.direction = "north"
            player.y -= (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerMoveSouth: function(id, delta) {
        var player = this.data[id]
        if(player.status != 0) {
            player.direction = "south"
            player.y += (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerMoveEast: function(id, delta) {
        var player = this.data[id]
        if(player.status != 0) {
            player.direction = "east"
            player.x += (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerMoveWest: function(id, delta) {
        var player = this.data[id]
        if(player.status != 0) {
            player.direction = "west"
            player.x -= (player.velocity * delta)
            this.trigger(this.data)
        }
    },
    onPlayerAttack: function(id) {
        var player1 = this.data[id]
        if(player1.status != 0) {
            if(player1.cooldown <= 0) {
                player1.cooldown = 1.5
                for(var index in this.data) {
                    if(id != index) {
                        var player2 = this.data[index]
                        if(player2.status == 1) {
                            if(this.isIntersecting(player1, player2)) {
                                PlayerActions.Die(index)
                            }
                        }
                    }
                }
            }
        }
    },
    
    onTouchStatue: function(id, sid) {
        if(this.data[id].touches.indexOf(sid) == -1) {
            this.data[id].touches.push(sid)
            if(this.data[id].touches.length == 3) {
                this.data[id].radius = 1
                this.data[id].color = "red"
            }
            //new Audio("./sounds/ding.wav").play()
            this.trigger(this.data)
        }
    },
    onDie: function(id) {
        this.data[id].status = 0
        this.trigger(this.data)
    },
    isIntersecting: function(alpha, omega) {
        var x = alpha.x - omega.x
        var y = alpha.y - omega.y
        
        var d = Math.sqrt(x * x + y * y)
        var l = alpha.radius + omega.radius
        
        return d < l
    }
})

module.exports = PlayerStore
