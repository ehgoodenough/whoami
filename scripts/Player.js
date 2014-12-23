var PlayerKeyboardMixin = require("./PlayerKeyboardMixin");

var Player = React.createClass({
    mixins: [
        PlayerKeyboardMixin
    ],
    events: {
        "move up": function(delta) {
            var yp = this.state.y - (this.state.velocity * delta)
            this.setState({y: yp})
        },
        "move down": function(delta) {
            var yp = this.state.y + (this.state.velocity * delta)
            this.setState({y: yp})
        },
        "move left": function(delta) {
            var xp = this.state.x - (this.state.velocity * delta)
            this.setState({x: xp})
        },
        "move right": function(delta) {
            var xp = this.state.x + (this.state.velocity * delta)
            this.setState({x: xp})
        }
    },
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            x: 1,
            y: 1,
            width: 1,
            height: 1,
            velocity: 0.1
        }
    },
    render: function() {
        return (
            <div className="player" style={this.getStyle()}></div>
        )
    },
    getStyle: function() {
        return {
            top: this.state.y - (this.state.height / 2)  + "rem",
            left: this.state.x - (this.state.width / 2) + "rem",
            width: this.state.width + "rem",
            height: this.state.height + "rem"
        }
    }
})

module.exports = Player
