var Keyboard = require("<root>/scripts/systems/Keyboard")
var SystemActions = require("<root>/scripts/actions/SystemActions")

var EventSystem = {
    loop: function() {
        var delta = EventSystem.getTimeDelta()
        
        Keyboard.onLoop(delta)
        SystemActions.Tick(delta)
        
        EventSystem.resetTime()
        EventSystem.reloop()
    },
    reloop: function() {
        requestAnimationFrame(this.loop)
    },
    getTimeDelta: function() {
        return (Date.now() - this._time) / 60
    },
    resetTime: function() {
        this._time = Date.now()
    },
    _time: Date.now()
}

requestAnimationFrame(EventSystem.loop)

module.exports = EventSystem
