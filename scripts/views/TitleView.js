var ViewActions = require("<root>/scripts/actions/ViewActions")
var JoinView = require("<root>/scripts/views/JoinView")

var TitleView = React.createClass({
    render: function() {
        return (
            <div id="title" className="view">
                <h1>whoami</h1>
                <h2>a game about being an npc</h2>
                <div className="link" onClick={this.gotoNextView}>
                    Play!! :D
                </div>
            </div>
        )
    },
    gotoNextView: function(event) {
        ViewActions.ChangeTo("JoinView")
    }
})

module.exports = TitleView
