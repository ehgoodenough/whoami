var PlayerKeyboard = require("<root>/scripts/systems/PlayerKeyboard")

var EventSystem = {
    loop: function() {
        var delta = EventSystem.getTimeDelta()
        
        PlayerKeyboard.onLoop(delta)
        
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
