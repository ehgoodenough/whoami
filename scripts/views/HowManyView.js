var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var PlayView = require("<root>/scripts/views/PlayView")
var PlayerConfiguration = require("<root>/scripts/systems/PlayerConfiguration")

var HowManyView = React.createClass({
    render: function() {
        var renderedPlayerBoxes = new Array()
        for(var id in PlayerConfiguration) {
            var config = PlayerConfiguration[id]
            renderedPlayerBoxes.push(
                <div className="player-box" key={id}>
                    <b>{config.name}</b>
                    <small>Hit a key to join!</small>
                </div>
            )
        }
        return (
            <div id="how-many" className="view">
                {renderedPlayerBoxes}
            </div>
        )
    },
    nextView: function(event) {
        CurrentViewActions.ChangeView(PlayView)
    }
})

module.exports = HowManyView
