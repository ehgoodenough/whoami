var PlayView = require("<root>/scripts/views/PlayView")
var TitleView = require("<root>/scripts/views/TitleView")
var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")

var JoinBox = require("<root>/scripts/JoinBox")
var Keyboard = require("<root>/scripts/systems/Keyboard")
var KeyboardMixin = require("<root>/scripts/mixins/KeyboardMixin")
var PlayerConfiguration = require("<root>/scripts/systems/PlayerConfiguration")

var JoinView = React.createClass({
    mixins: [
        KeyboardMixin
    ],
    bindings: {
        "escape": "OnGotoTitleView"
    },
    getInitialState: function() {
        return {
            players: []
        }
    },
    render: function() {
        var renderedJoinBoxes = new Array()
        for(var id in PlayerConfiguration) {
            var config = PlayerConfiguration[id]
            renderedJoinBoxes.push(
                <JoinBox config={config} id={id}
                         onJoinGame={this.onJoinGame}
                         hasJoined={this.hasJoined(id)}
                         key={id}/>
            )
        }
        return (
            <div id="join" className="view">
                {renderedJoinBoxes}
            </div>
        )
    },
    hasJoined: function(id) {
        return this.state.players.indexOf(id) != -1
    },
    OnGotoTitleView: function() {
        var TitleView = require("<root>/scripts/views/TitleView")
        CurrentViewActions.ChangeView(TitleView)
    },
    onJoinGame: function(id) {
        this.setState({players: this.state.players.concat([id])})
    }
})

module.exports = JoinView
