var Link = ReactRouter.Link

var Player = require("<scripts>/components/Player")
var Statue = require("<scripts>/components/Statue")
var Smoke = require("<scripts>/components/Smoke")
var Nonplayer = require("<scripts>/components/Nonplayer")

var PlayerStore = require("<scripts>/stores/PlayerStore")
var StatueStore = require("<scripts>/stores/StatueStore")
var SmokeStore = require("<scripts>/stores/SmokeStore")
var NonplayerStore = require("<scripts>/stores/NonplayerStore")
var PlaythroughStore = require("<scripts>/stores/PlaythroughStore")

var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")

var OfflineGameView = React.createClass({
    mixins: [
        Reflux.connect(PlayerStore, "players"),
        Reflux.connect(StatueStore, "statues"),
        Reflux.connect(SmokeStore, "smokes"),
        Reflux.connect(NonplayerStore, "nonplayers"),
        Reflux.connect(PlaythroughStore, "playthrough"),
    ],
    componentDidMount: function() {
        new Audio("./assets/sounds/ahoo.mp3").play()
        PlaythroughActions.BeginPlaythrough({
            size: this.props.params.size
        })
    },
    componentWillUnmount: function() {
        PlaythroughActions.QuitPlaythrough()
    },
    render: function() {
        return (
            <div id="offline-game" className="view">
                {this.renderEntities(Player, "players")}
                {this.renderEntities(Nonplayer, "nonplayers")}
                {this.renderEntities(Statue, "statues")}
                {this.renderEntities(Smoke, "smokes")}
                {this.renderMessage()}
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
    renderMessage: function() {
        if(this.state.playthrough.message) {
            var message = this.state.playthrough.message
            if(message == "Game Over!") {
                return (
                    <div className="message">
                        <h3>Game Over!</h3>
                        <Link to="offline-game-list">
                            Click here to go back.
                        </Link>
                    </div>
                )
            } else {
                return (
                    <div className="message">
                        {message}
                    </div>
                )
            }
        }
    }
})

module.exports = OfflineGameView
