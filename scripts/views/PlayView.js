var Player = require("<root>/scripts/Player")
var Statue = require("<root>/scripts/Statue")
var PlayerStore = require("<root>/scripts/stores/PlayerStore")
var StatueStore = require("<root>/scripts/stores/StatueStore")

var PlayView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues")
    ],
    render: function() {
        return (
            <div id="play" className="view">
                {this.renderEntities(Player, "players")}
                {this.renderEntities(Statue, "statues")}
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
