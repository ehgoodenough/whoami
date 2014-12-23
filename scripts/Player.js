var PlayerKeyboardMixin = require("./PlayerKeyboardMixin")
var PlayerActions = require("./PlayerActions")

var Player = React.createClass({
    mixins: [
        PlayerKeyboardMixin
    ],
    events: {
        "move up": function(delta) {
            var y = this.props.data.y - (this.props.data.velocity * delta)
            PlayerActions.MoveVertically(this.props.id, y)
        },
        "move down": function(delta) {
            var y = this.props.data.y + (this.props.data.velocity * delta)
            PlayerActions.MoveVertically(this.props.id, y)
        },
        "move left": function(delta) {
            var x = this.props.data.x - (this.props.data.velocity * delta)
            PlayerActions.MoveHorizontally(this.props.id, x)
        },
        "move right": function(delta) {
            var x = this.props.data.x + (this.props.data.velocity * delta)
            PlayerActions.MoveHorizontally(this.props.id, x)
        }
    },
    propTypes: {
        id: React.PropTypes.string.isRequired
        /*data: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number,
            width: React.PropTypes.number,
            height: React.PropTypes.number,
            velocity: React.PropTypes.number,
        })*/
    },
    render: function() {
        return (
            <div className="player" style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: this.props.data.y - (this.props.data.height / 2) + "rem",
            left: this.props.data.x - (this.props.data.width / 2) + "rem",
            width: this.props.data.width + "rem",
            height: this.props.data.height + "rem"
        }
    }
})

module.exports = Player
