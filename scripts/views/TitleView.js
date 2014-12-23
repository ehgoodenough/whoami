var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var HowManyView = require("<root>/scripts/views/HowManyView")

var TitleView = React.createClass({
    render: function() {
        return (
            <div id="title" className="view">
                <h1>iamnpc</h1>
                <h2>A game about being an NPC</h2>
                <div className="link" onClick={this.nextView}>
                    Play!! :D
                </div>
            </div>
        )
    },
    nextView: function(event) {
        CurrentViewActions.ChangeView(HowManyView)
    }
})

module.exports = TitleView
