var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")
window.PlaythroughActions = PlaythroughActions
var PlayerStore = Reflux.createStore({
    data: {},
    getInitialState: function() {
        return this.data
    },
    listenables: [
        PlayerActions,
        PlaythroughActions
    ],
    onBeginPlaythrough: function(data) {
        this.data = {}
        for(var index = 0; index < data.players; index++) {
            this.data[index] = {
                x: Math.floor(Math.random() * (20 - 2) + (2 / 2)),
                y: Math.floor(Math.random() * (15 - 2) + (2 / 2)),
                radius: 0.5,
                velocity: 0.1,
                direction: "south",
                status: 1,
                touches: []
            }
        }
        this.trigger(this.data)
    },
    onMoveHorizontally: function(id, x) {
        this.data[id].x = x
        this.trigger(this.data)
    },
    onMoveVertically: function(id, y) {
        this.data[id].y = y
        this.trigger(this.data)
    },
    onTouchStatue: function(id, sid) {
        if(this.data[id].touches.indexOf(sid) == -1) {
            this.data[id].touches.push(sid)
            if(this.data[id].touches.length == 3) {
                this.data[id].radius = 1
                this.data[id].color = "red"
            }
            new Audio("./sounds/ding.wav").play()
            this.trigger(this.data)
        }
    },
    onAttack: function(id) {
        for(var pid in this.data) {
            if(id != pid) {
                var me = this.data[id]
                var them = this.data[pid]
                if(them.status == 1) {
                    if(this.isIntersecting(me, them)) {
                        PlayerActions.Die(pid)
                    }
                }
            }
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
