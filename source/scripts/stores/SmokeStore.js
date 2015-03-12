var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")
var SmokeActions = require("<scripts>/actions/SmokeActions")
var LoopActions = require("<scripts>/actions/LoopActions")

var SmokeStore = Reflux.createStore({
    data: new Array(),
    getData: function() {
        return this.data
    },
    listenables: [
        PlaythroughActions,
        SmokeActions,
        LoopActions
    ],
    onBeginPlaythrough: function() {
        this.data = new Array()
        this.retrigger()
    },
    onQuitPlaythrough: function() {
        this.data = new Array()
        this.retrigger()
    },
    onCreateSmoke: function(smoke) {
        this.data.push({
            x: smoke.x,
            y: smoke.y,
            radius: 0.25,
            opacity: 3
        })
        this.retrigger()
    },
    onTick: function(tick) {
        for(var index in this.data) {
            var smoke = this.data[index]
            if(smoke != undefined) {
                smoke.opacity -= 0.5 * tick
                smoke.radius += 0.5 * tick
                if(smoke.opacity < 0) {
                    delete this.data[index]
                }
            }
        }
        this.retrigger()
    }
})

module.exports = SmokeStore
