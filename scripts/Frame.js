var PlayView = require("./PlayView")

var Frame = React.createClass({
    render: function() {
        return (
            <div id="frame">
                <PlayView/>
            </div>
        )
    }
})

module.exports = Frame
