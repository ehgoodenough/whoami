var Player = require("<root>/scripts/components/Player")
var Statue = require("<root>/scripts/components/Statue")
var Smoke = require("<root>/scripts/components/Smoke")
var Nonplayer = require("<root>/scripts/components/Nonplayer")

var KeyboardMixin = require("<root>/scripts/mixins/KeyboardMixin")

var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var StatueStore = require("<root>/scripts/stores/StatueStore")
var SmokeStore = require("<root>/scripts/stores/SmokeStore")
var NonplayerStore = require("<root>/scripts/stores/NonplayerStore")
var PlaythroughStore = require("<root>/scripts/stores/PlaythroughStore")

var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")

var PlaythroughView = React.createClass({
    mixins: [
        KeyboardMixin,
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues"),
        Reflux.connect(SmokeStore, "smokes"),
        Reflux.connect(NonplayerStore, "nonplayers"),
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
                {this.renderEntities(Smoke, "smokes")}
                {this.renderEntities(Nonplayer, "nonplayers")}
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
    },
    quitPlaythrough: function() {
        PlaythroughActions.QuitPlaythrough()
    }
})

module.exports = PlaythroughView
