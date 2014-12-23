var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var CurrentViewActions= require("<root>/scripts/actions/CurrentViewActions")

var PlayerStore = Reflux.createStore({
    data: {
        "1": {
            x: 1,
            y: 1,
            radius: 0.5,
            velocity: 0.1,
            color: "#1EBE39",
            status: 1,
            touches: []
        },
        "2": {
            x: 10,
            y: 10,
            radius: 0.5,
            velocity: 0.1,
            color: "#1EBE39",
            status: 1,
            touches: []
        }
    },
    records: {
        deaths: 0
    },
    getInitialState: function() {
        return this.data
    },
    listenables: [
        PlayerActions
    ],
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
            console.log("ping")
            if(this.data[id].touches.length == 3) {
                this.data[id].radius = 1
                this.data[id].color = "red"
            }
            this.trigger(this.data)
        }
    },
    onAttack: function(id) {
        for(var pid in this.data) {
            if(id != pid) {
                var alpha = this.data[id]
                var omega = this.data[pid]
                if(omega.status == 1) {
                    if(this.isIntersecting(alpha, omega)) {
                        PlayerActions.Die(pid)
                    }
                }
            }
        }
    },
    onDie: function(id) {
        this.data[id].status = 0
        this.data[id].color = "black"
        this.trigger(this.data)

        this.records.deaths += 1
        if(this.records.deaths == Object.keys(this.data).length - 1) {
            var TitleView = require("<root>/scripts/views/TitleView")
            CurrentViewActions.ChangeView(TitleView)
        }
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
