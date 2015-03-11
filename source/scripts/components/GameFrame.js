var ViewStore = require("<scripts>/stores/ViewStore")
var PlaythroughActions = require("<scripts>/actions/PlaythroughActions")
var PlaythroughStore = require("<scripts>/stores/PlaythroughStore")
var Loop = require("<scripts>/systems/Loop")

var GameFrame = React.createClass({
    mixins: [
        Reflux.connect(ViewStore, "view")
    ],
    componentDidMount: function() {
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
