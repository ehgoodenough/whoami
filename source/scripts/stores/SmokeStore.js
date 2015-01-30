var LoopActions = require("<root>/scripts/actions/LoopActions")
var SmokeActions = require("<root>/scripts/actions/SmokeActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")

var SmokeStore = Reflux.createStore({
    listenables: [
        SmokeActions,
        LoopActions,
        PlaythroughActions
    ],
    data: [],
    getInitialState: function() {
        return this.data
    },
    onQuitPlaythrough: function() {
        this.data = []
        this.trigger(this.data)
    },
    onCreateSmoke: function(data) {
        this.data.push({
            x: data.x,
            y: data.y,
            radius: 0.25,
            opacity: 3
        })
    },
    onTick: function(delta) {
        for(var index in this.data) {
            var smoke = this.data[index]
            if(smoke != undefined) {
                smoke.opacity -= 0.5 * delta
                smoke.radius += 0.5 * delta
                
                if(smoke.opacity < 0) {
                    delete this.data[index]
                }
            }
        }
        this.trigger(this.data)
    }
})

module.exports = SmokeStore
