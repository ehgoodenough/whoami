var PlayerKeyboardMixin = require("<root>/scripts/mixins/PlayerKeyboardMixin")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")

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
            if(this.props.data.status == 0) {return;}
            var x = this.props.data.x + (this.props.data.velocity * delta)
            PlayerActions.MoveHorizontally(this.props.id, x)
        }
    },
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div className="player" style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: this.props.data.y - this.props.data.radius + "rem",
            left: this.props.data.x - this.props.data.radius + "rem",
            width: this.props.data.radius * 2 + "rem",
            height: this.props.data.radius * 2 + "rem"
        }
    }
})

module.exports = Player
