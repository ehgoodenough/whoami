var PlayerConfiguration = require("<root>/scripts/systems/PlayerConfiguration")
var Keyboard = require("<root>/scripts/systems/Keyboard")
var KeyboardMixin = require("<root>/scripts/mixins/KeyboardMixin")

var JoinBox = React.createClass({
    mixins: [
        KeyboardMixin
    ],
    bindings: {
        "w": "onJoinGame",
        "a": "onJoinGame",
        "s": "onJoinGame",
        "d": "onJoinGame"
    },
    propType: {
        id: React.PropTypes.number.isRequired,
        config: React.PropTypes.object.isRequired,
        onJoinGame: React.PropTypes.func.isRequired,
        hasJoined: React.PropTypes.bool.isRequired
    },
    render: function() {
        if(this.props.hasJoined) {
            return (
                <div className="join-box">
                    <b>{this.props.config.name}</b>
                    has joined!
                </div>
            )
        } else {
            return (
                <div className="join-box">
                    <b>{this.props.config.name}</b>
                    <small>Hit a key to join!</small>
                </div>
            )
        }
    },
    onJoinGame: function() {
        this.props.onJoinGame(this.props.id)
    }
})

module.exports = JoinBox