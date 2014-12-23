var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var PlayView = require("<root>/scripts/views/PlayView")

var HowManyView = React.createClass({
    render: function() {
        return (
            <div id="how-many" className="view">
                <div className="join-box">wasd</div>
                <div className="join-box">fght</div>
                <div className="join-box">jkli</div>
                <div className="join-box">arrows</div>
            </div>
        )
    },
    nextView: function(event) {
        CurrentViewActions.ChangeView(PlayView)
    }
})

module.exports = HowManyView
