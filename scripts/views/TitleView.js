var ViewActions = require("<root>/scripts/actions/ViewActions")
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
        ViewActions.ChangeTo(JoinView)
    }
})

module.exports = TitleView
