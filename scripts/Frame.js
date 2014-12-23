var Player = require("./Player")

var Frame = React.createClass({
    render: function() {
        return (
            <div id="frame">
                <Player/>
            </div>
        )
    }
})

module.exports = Frame
