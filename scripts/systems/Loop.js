var LoopActions = require("<root>/scripts/actions/LoopActions")

var Loop = {
    tick: function() {
        Loop.time = (Date.now() - Loop.time) / 60
        
        LoopActions.Tick(Loop.time)
        
        Loop.time = Date.now()
        Loop.retick()
    },
    retick: function() {
        requestAnimationFrame(this.tick)
    },
    time: Date.now()
}

module.exports = Loop
