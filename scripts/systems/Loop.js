var Keyboard = require("<root>/scripts/systems/Keyboard")
var LoopActions = require("<root>/scripts/actions/LoopActions")

var Loop = {
    tick: function() {
        var delta = Loop.getTimeDelta()
        
        Keyboard.onLoop(delta)
        LoopActions.Tick(delta)
        
        Loop.resetTime()
        Loop.retick()
    },
    retick: function() {
        requestAnimationFrame(this.tick)
    },
    getTimeDelta: function() {
        return (Date.now() - this._time) / 60
    },
    resetTime: function() {
        this._time = Date.now()
    },
    _time: Date.now()
}

module.exports = Loop
