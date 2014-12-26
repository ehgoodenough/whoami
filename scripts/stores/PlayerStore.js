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
            canAttack: true,
            touches: [],
            direction: "south"
        },
        "2": {
            x: 10,
            y: 10,
            radius: 0.5,
            velocity: 0.1,
            color: "#1EBE39",
            status: 1,
            canAttack: true,
            touches: [],
            direction: "south"
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
        if(this.data[id].x < x) {
            this.data[id].direction = "east"
        } else if(this.data[id].x > x) {
            this.data[id].direction = "west"
        }
        
        this.data[id].x = x
        
        this.trigger(this.data)
    },
    onMoveVertically: function(id, y) {
        if(this.data[id].y < y) {
            this.data[id].direction = "south"
        } else if(this.data[id].y > y) {
            this.data[id].direction = "north"
        }
        
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
        var it_hit = false;
        for(var pid in this.data) {
            if(id != pid) {
                var alpha = this.data[id]
                var omega = this.data[pid]
                if(omega.status == 1) {
                    if(this.isIntersecting(alpha, omega)) {
                        PlayerActions.Die(pid)
                        it_hit = true;
                    }
                }
            }
        }
        if(it_hit) {
            new Audio("./sounds/whack.mp3").play()
        }
        this.data[id].canAttack = false;
        this.data[id].color = "green";
        this.data[id].velocity = 0.05;
        setTimeout(function()
        {
            this.data[id].canAttack = true;
            this.data[id].color = "#1EBE39";
            this.data[id].velocity = 0.1;
        }
        .bind(this), 500)
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
