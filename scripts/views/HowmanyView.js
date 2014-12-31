var ViewActions = require("<root>/scripts/actions/ViewActions")
var PlaythroughActions = require("<root>/scripts/actions/PlaythroughActions")

var KeyboardMixin = require("<root>/scripts/mixins/KeyboardMixin")

var HowmanyView = React.createClass({
    mixins: [
        KeyboardMixin
    ],
    componentWillMount: function() {
        this.connect("escape", this.gotoPreviousView)
        this.connect("1", this.beginPlaythrough.bind(null, 1))
        this.connect("2", this.beginPlaythrough.bind(null, 2))
        this.connect("3", this.beginPlaythrough.bind(null, 3))
        this.connect("4", this.beginPlaythrough.bind(null, 4))
    },
    render: function() {
        return (
            <div id="howmany" className="view">
                {this.renderHowmanyBoxes()}
            </div>
        )
    },
    renderHowmanyBoxes: function() {
        var renderedHowmanyBoxes = []
        var subtitles = [
            "Tutorial",
            "Confused Dueling",
            "Digital Identity Crisis",
            "Simulated Agoraphobia"
        ]
        for(var index = 0; index < 4; index++) {
            renderedHowmanyBoxes.push(
                <div className="howmany-box" key={index} onClick={this.beginPlaythrough.bind(null, index)}>
                    <b>{index + 1} Player{index > 0 ? "s" : ""}</b>
                    <span className="subtitle">
                        {subtitles[index]}
                    </span>
                </div>
            )
        }
        return renderedHowmanyBoxes
    },
    gotoPreviousView: function() {
        ViewActions.ChangeView("TitlescreenView")
    },
    beginPlaythrough: function(players) {
        PlaythroughActions.BeginPlaythrough({
            players: players
        })
    }
})

module.exports = HowmanyView
