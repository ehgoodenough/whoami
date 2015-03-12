var ViewActions = require("<scripts>/actions/ViewActions")
var KeyboardMixin = require("<scripts>/mixins/KeyboardMixin")

var Link = ReactRouter.Link

var TitlescreenView = React.createClass({
    mixins: [
        //KeyboardMixin
    ],
    componentWillMount: function() {
        //this.connect("enter", this.gotoNextView)
    },
    render: function() {
        return (
            <div className="titlescreen view">
                <header>
                    <h1>whoami?</h1>
                    <h2>a game of utter confusion</h2>
                </header>
                <menu>
                    <Link to="game-list" onClick={this.onExitView}>
                        Play!! :D
                    </Link>
                </menu>
            </div>
        )
    },
    onExitView: function(event) {
        new Audio("./assets/sounds/hoo.mp3").play()
    }
})

module.exports = TitlescreenView
