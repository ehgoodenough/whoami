var Player = require("./Player")
var Statue = require("./Statue")
var PlayerStore = require("./PlayerStore")

var PlayView = React.createClass({
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
                <Statue id={"2"} data={{x: 4, y: 4, width: 2, height: 2}}/>
            </div>
        )
    }
})

module.exports = PlayView
