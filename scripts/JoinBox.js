var PlayerConfiguration = require("<root>/scripts/systems/PlayerConfiguration")
var PlayerKeyboard = require("<root>/scripts/systems/PlayerKeyboard")

var JoinBox = React.createClass({
    componentWillMount: function() {
        PlayerKeyboard.bindEvent("space bar", this.onJoin)
    },
    componentWillUnmount: function() {
        PlayerKeyboard.unbindEvent("space bar", this.onJoin)
    },
    render: function() {
        var configuration = PlayerConfiguration[this.props.id]
        return (
            <div className="join-box">
                <b>{configuration.name}</b>
                <small>Hit a key to join!</small>
            </div>
        )
    },
    onJoin: function() {
        console.log("!")
    }
})

module.exports = JoinBox