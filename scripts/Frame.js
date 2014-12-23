var Player = require("./Player")

var Frame = React.createClass({
    render: function() {
        return (
            <div id="frame">
                <Player id="1"/>
            </div>
        )
    }
})

module.exports = Frame
