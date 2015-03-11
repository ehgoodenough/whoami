var Player = require("<scripts>/components/Player")
var Statue = require("<scripts>/components/Statue")
var Smoke = require("<scripts>/components/Smoke")
var Nonplayer = require("<scripts>/components/Nonplayer")

var KeyboardMixin = require("<scripts>/mixins/KeyboardMixin")

var PlayerStore = require("<scripts>/stores/PlayerStore")
var StatueStore = require("<scripts>/stores/StatueStore")
var SmokeStore = require("<scripts>/stores/SmokeStore")
var NonplayerStore = require("<scripts>/stores/NonplayerStore")
var PlaythroughStore = require("<scripts>/stores/PlaythroughStore")

var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")

var PlaythroughView = React.createClass({
    mixins: [
        KeyboardMixin,
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues"),
        Reflux.connect(SmokeStore, "smokes"),
        Reflux.connect(NonplayerStore, "nonplayers"),
        Reflux.connect(PlaythroughStore, "playthrough"),
    ],
    componentWillMount: function() {
        this.connect("escape", PlaythroughActions.QuitPlaythrough)
    },
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
    }
})

module.exports = PlaythroughView
