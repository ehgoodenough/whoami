var PlayerKeyboardMixin = require("<root>/scripts/mixins/PlayerKeyboardMixin")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")

var Player = React.createClass({
    mixins: [
        PlayerKeyboardMixin
    ],
    events: {
        "move north": function(delta) {
            PlayerActions.PlayerMoveNorth(this.props.id, delta)
        },
        "move south": function(delta) {
            PlayerActions.PlayerMoveSouth(this.props.id, delta)
        },
        "move west": function(delta) {
            PlayerActions.PlayerMoveWest(this.props.id, delta)
        },
        "move east": function(delta) {
            PlayerActions.PlayerMoveEast(this.props.id, delta)
        },
        "attack": function(delta) {
            PlayerActions.PlayerAttack(this.props.id)
        }
    },
    render: function() {
        return (
            <div className={this.renderClasses()} style={this.renderStyles()}/>
        )
    },
    renderClasses: function() {
        return React.addons.classSet({
            "player": true
        })
    },
    renderStyles: function() {
        return {
            top: this.props.data.y - this.props.data.radius * this.props.data.scale + "rem",
            left: this.props.data.x - this.props.data.radius * this.props.data.scale + "rem",
            width: this.props.data.radius * 2 * this.props.data.scale + "rem",
            height: this.props.data.radius * 2 * this.props.data.scale + "rem",
            backgroundImage: "url(./images/player." + this.props.data.image + ".png)"
        }
    }
})

module.exports = Player
