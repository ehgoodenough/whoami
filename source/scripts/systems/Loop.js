var LoopActions = require("<scripts>/actions/LoopActions")

var Loop = {
    tick: function() {
        Loop.time = (Date.now() - Loop.time) / 1000
        
        LoopActions.Tick(Loop.time)
        
        Loop.time = Date.now()
        Loop.retick()
    },
    retick: function() {
        requestAnimationFrame(this.tick)
    },
    time: Date.now()
}

Loop.tick()

module.exports = Loop
