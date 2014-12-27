var PlayerKeyboardMixin = require("<root>/scripts/mixins/PlayerKeyboardMixin")
var PlayerActions = require("<root>/scripts/actions/PlayerActions")

var Player = React.createClass({
    mixins: [
        PlayerKeyboardMixin
    ],
    events: {
        "move up": function(delta) {
            if(this.props.data.status == 0) {return}
            var y = this.props.data.y - (this.props.data.velocity * delta)
            PlayerActions.MoveVertically(this.props.id, y)
        },
        "move down": function(delta) {
            if(this.props.data.status == 0) {return}
            var y = this.props.data.y + (this.props.data.velocity * delta)
            PlayerActions.MoveVertically(this.props.id, y)
        },
        "move left": function(delta) {
            if(this.props.data.status == 0) {return}
            var x = this.props.data.x - (this.props.data.velocity * delta)
            PlayerActions.MoveHorizontally(this.props.id, x)
        },
        "move right": function(delta) {
            if(this.props.data.status == 0) {return}
            var x = this.props.data.x + (this.props.data.velocity * delta)
            PlayerActions.MoveHorizontally(this.props.id, x)
        },
        "attack": function(delta) {
            if(this.props.data.status == 0) {return}
            console.log("is attacking")
            //PlayerActions.Attack(this.props.id, this.props.x, this.props.y, this.props.radius)
        }
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
            height: this.props.data.radius * 2 + "rem",
            backgroundImage: this.renderBackgroundImage()
        }
    },
    renderBackgroundImage: function() {
        var direction, action
        
        if(this.props.data.canAttack = false) {
            action = "attack"
        } else {
            action = "move"
        }
        
        direction = this.props.data.direction
        
        return "url(./images/player." + action + "." + direction + ".png)"
    }
})

module.exports = Player