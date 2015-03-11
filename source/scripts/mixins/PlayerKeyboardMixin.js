var Keyboard = require("<scripts>/systems/Keyboard")
var PlayerConfiguration = require("<scripts>/systems/PlayerConfiguration")

var PlayerKeyboardMixin = {
    componentWillMount: function() {
        for(var eventname in this.events) {
            var event = this.events[eventname].bind(this)
            var config = PlayerConfiguration[this.props.id]
            var keyname = config.input.keyboard[eventname]
            Keyboard.bindEvent(keyname, event)
        }
    },
    componentWillUnmount: function() {
        for(var eventname in this.events) {
            var event = this.events[eventname].bind(this)
            var config = PlayerConfiguration[this.props.id]
            var keyname = config.input.keyboard[eventname]
            Keyboard.unbindEvent(keyname, event)
        }
    }
}

module.exports = PlayerKeyboardMixin
