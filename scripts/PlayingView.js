var Player = require("./Player")
var PlayerStore = require("./PlayerStore")

var PlayingView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players")
    ],
    render: function() {
        var renderedPlayers = []
        for(var id in this.state.players) {
            var data = this.state.players[id]
            renderedPlayers.push(
                <Player id={id} data={data} key={id}/>
            )
        }
        return (
            <div>
                {renderedPlayers}
            </div>
        )
    }
})

module.exports = PlayingView
