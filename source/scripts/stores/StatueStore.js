var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")

var StatueStore = Reflux.createStore({
    data: {
        "A": {
            x: 5,
            y: 5,
            radius: 0.8
        },
        "B": {
            x: 15,
            y: 3,
            radius: 1
        },
        "C": {
            x: 11,
            y: 13,
            radius: 0.9
        }
    },
    getInitialState: function() {
        return this.data
    },
    //onBeginPlaythrough: create all the statues
    //onQuitPlaythrough: destroy all the statues
    init: function() {
        this.listenTo(PlayerStore, this.onPlayerStore)
    },
    onPlayerStore: function(data) {
        for(var pid in data) {
            var p = data[pid]
            for(var sid in this.data) {
                var s = this.data[sid]
                if(this.isIntersecting(p, s)) {
                    PlayerActions.PlayerTouchStatue(pid, sid)
                }
            }
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

module.exports = StatueStore
