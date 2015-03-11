var ViewActions = require("<scripts>/actions/ViewActions")
var KeyboardMixin = require("<scripts>/mixins/KeyboardMixin")

var Link = ReactRouter.Link

var TitlescreenView = React.createClass({
    mixins: [
        KeyboardMixin
    ],
    componentWillMount: function() {
        this.connect("enter", this.gotoNextView)
    },
    render: function() {
        return (
            <div className="titlescreen view">
                <header>
                    <h1>whoami?</h1>
                    <h2>a game of utter confusion</h2>
                </header>
                <menu>
                    <Link to="lobby" params={{name: "123"}}>
                        Play!! :D
                    </Link>
                </menu>
            </div>
        )
    },
    gotoNextView: function(event) {
        ViewActions.ChangeView("HowmanyView")
    }
})

module.exports = TitlescreenView
