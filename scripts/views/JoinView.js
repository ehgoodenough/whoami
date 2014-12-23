var PlayView = require("<root>/scripts/views/PlayView")
var TitleView = require("<root>/scripts/views/TitleView")
var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")

var JoinBox = require("<root>/scripts/JoinBox")
var Keyboard = require("<root>/scripts/systems/Keyboard")
var PlayerConfiguration = require("<root>/scripts/systems/PlayerConfiguration")

var JoinView = React.createClass({
    componentWillMount: function() {
        Keyboard.bindEvent("escape", this.previousView)
    },
    componentWillUnmount: function() {
        Keyboard.unbindEvent("escape", this.previousView)
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
