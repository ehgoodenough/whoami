var PlayView = require("<root>/scripts/views/PlayView")
var ViewStore = require("<root>/scripts/stores/ViewStore")
var Loop = require("<root>/scripts/systems/Loop")

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
