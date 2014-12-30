var ViewActions = require("<root>/scripts/actions/ViewActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")

var Keyboard = require("<root>/scripts/systems/Keyboard")
var KeyboardMixin = require("<root>/scripts/mixins/KeyboardMixin")

var JoinView = React.createClass({
    mixins: [
        KeyboardMixin
    ],
    bindings: {
        "escape": "gotoTitleView"
    },
    getInitialState: function() {
        return {
            players: []
        }
    },
    render: function() {
        return (
            <div id="join" className="view">
                <div className="join-box">
                    <b>1 Player</b>
                    <small>Tutorial</small>
                </div>
                <div className="join-box" onClick={this.beginPlaythrough}>
                    <b>2 Players</b>
                    <small>Confused Ouroboros</small>
                </div>
                <div className="join-box">
                    <b>3 Players</b>
                    <small>Digital Identity Crisis</small>
                </div>
                <div className="join-box">
                    <b>4 Players</b>
                    <small>Simulated Agoraphobia</small>
                </div>
            </div>
        )
    },
    gotoTitleView: function() {
        ViewActions.ChangeTo("TitleView")
    },
    beginPlaythrough: function() {
        PlaythroughActions.BeginPlaythrough({
            players: 2
        })
    }
})

module.exports = JoinView
