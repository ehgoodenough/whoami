var ViewStore = require("<root>/scripts/stores/ViewStore")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")
var PlaythroughStore = require("<root>/scripts/stores/PlaythroughStore")
var Loop = require("<root>/scripts/systems/Loop")

var GameFrame = React.createClass({
    mixins: [
        Reflux.connect(ViewStore, "view")
    ],
    componentDidMount: function() {
        PlaythroughActions.BeginPlaythrough({
            players: 3
        })
        Loop.tick()
    },
    render: function() {
        var View = this.state.view
        return (
            <div id="game-frame">
                <View/>
            </div>
        )
    }
})

module.exports = GameFrame
