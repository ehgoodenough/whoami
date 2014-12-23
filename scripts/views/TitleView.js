var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var JoinView = require("<root>/scripts/views/JoinView")

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
        CurrentViewActions.ChangeView(JoinView)
    }
})

module.exports = TitleView
