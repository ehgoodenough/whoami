var PlayerKeyboardMixin = require("<scripts>/mixins/PlayerKeyboardMixin")
var PlayerActions = require("<scripts>/actions/PlayerActions")
var PlaythroughStore = require("<scripts>/stores/PlaythroughStore")

var Player = React.createClass({
    mixins: [
        PlayerKeyboardMixin,
        Reflux.connect(PlaythroughStore, "playthrough")
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
        },
        "drop bomb": function(delta) {
            PlayerActions.PlayerDropBomb(this.props.id)
        }
    },
    render: function() {
        return (
            <div className={this.renderClasses()} style={this.renderStyles()}/>
        )
    },
    renderClasses: function() {
        return React.addons.classSet({
            "player": true,
            "dead": this.props.data.status == "DEAD",
            "moving": this.props.data.isAttacking <= 1,
            "attacking": this.props.data.isAttacking > 1,
            "north": this.props.data.direction == "north",
            "south": this.props.data.direction == "south",
            "east": this.props.data.direction == "east",
            "west": this.props.data.direction == "west",
            "victory": this.props.data.status != "DEAD" && this.state.playthrough.finished
        })
    },
    renderStyles: function() {
        return {
            top: this.props.data.y - (this.props.data.scale / 2) + "em",
            left: this.props.data.x - (this.props.data.scale / 2) + "em",
            width: this.props.data.scale + "em",
            height: this.props.data.scale + "em"
        }
    }
})

module.exports = Player
