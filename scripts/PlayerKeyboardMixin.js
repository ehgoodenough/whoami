var PlayerKeyboard = require("./PlayerKeyboard")
var PlayerConfiguration = require("./PlayerConfiguration")

var PlayerKeyboardMixin = {
    componentWillMount: function() {
        for(var eventname in this.events) {
            var event = this.events[eventname].bind(this)
            var config = PlayerConfiguration[this.props.id]
            var keyname = config.input.keyboard[eventname]
            PlayerKeyboard.bindEvent(keyname, event)
        }
    },
    componentWillUnmount: function() {
        for(var eventname in this.events) {
            var event = this.events[eventname].bind(this)
            var config = PlayerConfiguration[this.props.id]
            var keyname = config.input.keyboard[eventname]
            PlayerKeyboard.unbindEvent(keyname, event)
        }
    }
}

module.exports = PlayerKeyboardMixin
