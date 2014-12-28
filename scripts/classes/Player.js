var PlayerKeyboardMixin = require("<root>/scripts/mixins/PlayerKeyboardMixin")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")
var PlaythroughStore = require("<root>/scripts/stores/PlaythroughStore")

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
            "dead": this.props.data.status == 0,
            "moving": this.props.data.attacking < 1,
            "attacking": this.props.data.attacking > 1,
            "north": this.props.data.direction == "north",
            "south": this.props.data.direction == "south",
            "east": this.props.data.direction == "east",
            "west": this.props.data.direction == "west",
            "victory": this.props.data.status != 0 && this.state.playthrough.finished
        })
    },
    renderStyles: function() {
        return {
            top: this.props.data.y - this.props.data.radius * this.props.data.scale + "rem",
            left: this.props.data.x - this.props.data.radius * this.props.data.scale + "rem",
            width: this.props.data.radius * 2 * this.props.data.scale + "rem",
            height: this.props.data.radius * 2 * this.props.data.scale + "rem"
        }
    }
})

module.exports = Player
