var Keyboard = require("<root>/scripts/systems/Keyboard")

var KeyboardMixin = {
	bindings: new Object(),
    bind: function(key, event) {
        this.bindings[key] = event
        Keyboard.bindEvent(key, event)
    },
    componentWillUnmount: function() {
        for(var key in this.bindings) {
            var event = this.bindings[key]
            Keyboard.unbindEvent(key, event)
        }
    }
}

module.exports = KeyboardMixin
