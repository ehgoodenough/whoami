var Player = require("<root>/scripts/Player")
var Statue = require("<root>/scripts/Statue")
var Nonplayer = require("<root>/scripts/Nonplayer")

var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var StatueStore = require("<root>/scripts/stores/StatueStore")
/*var NonplayerStore = require("<root>/scripts/stores/NonplayerStore")*/

var PlayView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues"),
        /*Reflux.connect(NonplayerStore, "nonplayers")*/
    ],
    render: function() {
        return (
            <div id="play" className="view">
                {this.renderEntities(Player, "players")}
                {this.renderEntities(Statue, "statues")}
                {/*this.renderEntities(Nonplayer, "nonplayers")*/}
            </div>
        )
    },
    renderEntities: function(Class, pointer) {
        var renderings = new Array()
        for(var id in this.state[pointer]) {
            var data = this.state[pointer][id]
            renderings.push(
                <Class id={id} data={data} key={id}/>
            )
        }
        return renderings
    }
})

module.exports = PlayView
