var Player = React.createClass({
    getInitialState: function() {
        return {
            x: 1,
            y: 1,
            width: 1,
            height: 1
        }
    },
    render: function() {
        return (
            <div className="player" style={this.getStyle()}></div>
        )
    },
    getStyle: function() {
        return {
            top: this.state.x - (this.state.width / 2) + "rem",
            left: this.state.y - (this.state.height / 2)  + "rem",
            width: this.state.width + "rem",
            height: this.state.height + "rem"
        }
    }
})

module.exports = Player
