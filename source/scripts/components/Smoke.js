var Smoke = React.createClass({
    render: function() {
        return (
            <div className={this.renderClasses()} style={this.renderStyles()}/>
        )
    },
    renderClasses: function() {
        return React.addons.classSet({
            "smoke": true
        })
    },
    renderStyles: function() {
        return {
            top: this.props.data.y - this.props.data.radius + "em",
            left: this.props.data.x - this.props.data.radius + "em",
            width: this.props.data.radius * 2 + "em",
            height: this.props.data.radius * 2 + "em",
            opacity: this.props.data.opacity
        }
    }
})

module.exports = Smoke
