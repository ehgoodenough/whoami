var PlayView = require("<root>/scripts/views/PlayView")
var TitleView = require("<root>/scripts/views/TitleView")
var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")

var JoinBox = require("<root>/scripts/JoinBox")
var PlayerKeyboard = require("<root>/scripts/systems/PlayerKeyboard")
var PlayerConfiguration = require("<root>/scripts/systems/PlayerConfiguration")

var JoinView = React.createClass({
    componentWillMount: function() {
        PlayerKeyboard.bindEvent("escape", this.previousView)
    },
    componentWillUnmount: function() {
        PlayerKeyboard.unbindEvent("escape", this.previousView)
    },
    render: function() {
        var renderedJoinBoxes = new Array()
        for(var id in PlayerConfiguration) {
            var config = PlayerConfiguration[id]
            renderedJoinBoxes.push(
                <JoinBox key={id} id={id}/>
            )
        }
        return (
            <div id="join" className="view">
                {renderedJoinBoxes}
            </div>
        )
    },
    nextView: function(event) {
        CurrentViewActions.ChangeView(PlayView)
    },
    previousView: function(event) {
        var TitleView = require("<root>/scripts/views/TitleView")
        CurrentViewActions.ChangeView(TitleView)
    }
})

module.exports = JoinView
