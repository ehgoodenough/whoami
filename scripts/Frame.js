var PlayingView = require("./PlayingView")

var Frame = React.createClass({
    render: function() {
        return (
            <div id="frame">
                <PlayingView/>
            </div>
        )
    }
})

module.exports = Frame
