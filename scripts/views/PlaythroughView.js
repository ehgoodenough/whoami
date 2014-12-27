var Player = require("<root>/scripts/classes/Player")
var Statue = require("<root>/scripts/classes/Statue")
var Nonplayer = require("<root>/scripts/classes/Nonplayer")

var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var StatueStore = require("<root>/scripts/stores/StatueStore")
//var NonplayerStore = require("<root>/scripts/stores/NonplayerStore")
var PlaythroughStore = require("<root>/scripts/stores/PlaythroughStore")

var PlaythroughView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues"),
        //Reflux.connect(NonplayerStore, "nonplayers")
        Reflux.connect(PlaythroughStore, "playthrough"),
    ],
    render: function() {
        var message = new String()
        if(this.state.playthrough.message) {
            message = <b>{this.state.playthrough.message}</b>
        }
        return (
            <div id="playthrough" className="view">
                {this.renderEntities(Player, "players")}
                {this.renderEntities(Statue, "statues")}
                {/*this.renderEntities(Nonplayer, "nonplayers")*/}
                {message}
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
