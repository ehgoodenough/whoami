var Keyboard = require("<root>/scripts/systems/Keyboard")

var KeyboardMixin = {
	binds: new Object(),
	componentWillMount: function() {
		for(var key in this.bindings) {
			var event = this.bindings[key]
			this.binds[key] = this[event]
			Keyboard.bindEvent(key, this[event])
		}
	},
    componentWillUnmount: function() {
        for(var key in this.binds) {
            var event = this.binds[key]
            Keyboard.unbindEvent(key, event)
        }
    }
}

module.exports = KeyboardMixin
