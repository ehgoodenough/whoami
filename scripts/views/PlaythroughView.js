var Player = require("<root>/scripts/classes/Player")
var Statue = require("<root>/scripts/classes/Statue")
var Nonplayer = require("<root>/scripts/classes/Nonplayer")

var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var StatueStore = require("<root>/scripts/stores/StatueStore")
//var NonplayerStore = require("<root>/scripts/stores/NonplayerStore")

var PlaythroughView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues"),
        //Reflux.connect(NonplayerStore, "nonplayers")
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
    renderEntities: function(Class, entities) {
        var renderings = new Array()
        for(var id in this.state[entities]) {
            var data = this.state[entities][id]
            renderings.push(
                <Class id={id} key={id} data={data}/>
            )
        }
        return renderings
    }
})

module.exports = PlaythroughView
