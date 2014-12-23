var PlayerStore = require("./PlayerStore")

var StatueStore = Reflux.createStore({
    data: {
        "A": {
            x: 5,
            y: 5,
            radius: 1
        }
    },
    getInitialState: function() {
        return this.data
    },
    init: function() {
        this.listenTo(PlayerStore, this.onPlayerStore)
    },
    onPlayerStore: function(data) {
        for(var i in data) {
            var alpha = data[i]
            for(var j in this.data) {
                var omega = this.data[j]
                if(this.isIntersecting(alpha, omega)) {
                    console.log(i, j)
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
