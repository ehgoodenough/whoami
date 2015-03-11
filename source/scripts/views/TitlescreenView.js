var ViewActions = require("<scripts>/actions/ViewActions")
var KeyboardMixin = require("<scripts>/mixins/KeyboardMixin")

var TitlescreenView = React.createClass({
    mixins: [
        KeyboardMixin
    ],
    componentWillMount: function() {
        this.connect("enter", this.gotoNextView)
    },
    render: function() {
        return (
            <div id="titlescreen" className="view">
                <header>
                    <h1>whoami?</h1>
                    <h2>a game about being an npc</h2>
                </header>
                <div className="action">
                    <span onClick={this.gotoNextView}>
                        Play!! :D
                    </span>
                </div>
            </div>
        )
    },
    gotoNextView: function(event) {
        ViewActions.ChangeView("HowmanyView")
    }
})

module.exports = TitlescreenView
