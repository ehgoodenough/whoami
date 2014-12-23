var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")

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
    init: function() {
        this.listenTo(PlayerStore, this.onPlayerStore)
    },
    onPlayerStore: function(data) {
        for(var id in data) {
            var alpha = data[id]
            for(var sid in this.data) {
                var omega = this.data[sid]
                if(this.isIntersecting(alpha, omega)) {
                    PlayerActions.TouchStatue(id, sid)
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
