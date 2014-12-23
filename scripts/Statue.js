var Statue = React.createClass({
    render: function() {
        return (
            <div className="statue" style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: this.props.data.y - (this.props.data.height / 2) + "rem",
            left: this.props.data.x - (this.props.data.width / 2) + "rem",
            width: this.props.data.width + "rem",
            height: this.props.data.height + "rem"
        }
    }
})

module.exports = Statue
