var PlayerKeyboardMixin = require("./PlayerKeyboardMixin")
var PlayerActions = require("./PlayerActions")

var Player = React.createClass({
    mixins: [
        PlayerKeyboardMixin
    ],
    events: {
        "move up": function(delta) {
            var y = this.props.data.y - (this.props.data.velocity * delta)
            PlayerActions.MoveTo(this.props.id, this.props.data.x, y)
        },
        "move down": function(delta) {
            var y = this.props.data.y + (this.props.data.velocity * delta)
            PlayerActions.MoveTo(this.props.id, this.props.data.x, y)
        },
        "move left": function(delta) {
            var x = this.props.data.x - (this.props.data.velocity * delta)
            PlayerActions.MoveTo(this.props.id, x, this.props.data.y)
        },
        "move right": function(delta) {
            var x = this.props.data.x + (this.props.data.velocity * delta)
            PlayerActions.MoveTo(this.props.id, x, this.props.data.y)
        }
    },
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div className="player" style={this.getStyle()}></div>
        )
    },
    getStyle: function() {
        return {
            top: this.props.data.y - (this.props.data.height / 2)  + "rem",
            left: this.props.data.x - (this.props.data.width / 2) + "rem",
            width: this.props.data.width + "rem",
            height: this.props.data.height + "rem"
        }
    }
})

module.exports = Player
