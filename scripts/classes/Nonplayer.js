var Nonplayer = React.createClass({
    render: function() {
        return (
            <div className="player" style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: this.props.data.y - this.props.data.radius + "rem",
            left: this.props.data.x - this.props.data.radius + "rem",
            width: this.props.data.radius * 2 + "rem",
            height: this.props.data.radius * 2 + "rem",
            backgroundColor: this.props.data.color
        }
    }
})

module.exports = Nonplayer
