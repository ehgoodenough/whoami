var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var PlayView = require("<root>/scripts/views/PlayView")

var TitleView = React.createClass({
    render: function() {
        return (
            <div id="title" className="view">
                <h1>iamnpc</h1>
                <h2>A game about being an NPC</h2>
                <div className="link" onClick={this.onClick}>
                    Play!!
                </div>
            </div>
        )
    },
    onClick: function(event) {
        CurrentViewActions.ChangeView(PlayView)
    }
})

module.exports = TitleView
