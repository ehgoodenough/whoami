var Keyboard = require("<scripts>/systems/Keyboard")

var KeyboardMixin = {
	connections: new Object(),
    connect: function(key, event) {
        this.connections[key] = event
        Keyboard.bindEvent(key, event)
    },
    componentWillUnmount: function() {
        for(var key in this.connections) {
            var event = this.connections[key]
            Keyboard.unbindEvent(key, event)
        }
    }
}

module.exports = KeyboardMixin
