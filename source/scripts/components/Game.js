
var Loop = require("<scripts>/systems/Loop")
var ViewStore = require("<scripts>/stores/ViewStore")
var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    mixins: [
        Reflux.connect(ViewStore, "view")
    ],
    render: function() {
        var ActiveView = this.state.view
        return (
            <GameFrame>
                <ActiveView/>
            </GameFrame>
        )
    }
})

module.exports = Game
