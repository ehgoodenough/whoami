var Statue = React.createClass({
    render: function() {
        return (
            <div className="statue" style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: this.props.data.y - (this.props.data.scale / 2) + "em",
            left: this.props.data.x - (this.props.data.scale / 2) + "em",
            width: this.props.data.scale + "em",
            height: this.props.data.scale + "em",
            opacity: this.props.data.status == "normal" ? 1 : 0
        }
    }
})

module.exports = Statue
