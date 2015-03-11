var Statue = React.createClass({
    render: function() {
        return (
            <div className="statue" style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: this.props.data.y - this.props.data.radius + "em",
            left: this.props.data.x - this.props.data.radius + "em",
            width: this.props.data.radius * 2 + "em",
            height: this.props.data.radius * 2 + "em"
        }
    }
})

module.exports = Statue
