var Player = require("./Player")
var Statue = require("./Statue")
var PlayerStore = require("./PlayerStore")
var StatueStore = require("./StatueStore")

var PlayView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues")
    ],
    render: function() {
        return (
            <div>
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
