var Nonplayer = React.createClass({
    render: function() {
        return (
            <div className={this.renderClasses()} style={this.renderStyles()}/>
        )
    },
    renderClasses: function() {
        return React.addons.classSet({
            "player": true,
            "moving": true,
            "dead": this.props.data.status == 0,
            "north": this.props.data.direction == "north",
            "south": this.props.data.direction == "south",
            "east": this.props.data.direction == "east",
            "west": this.props.data.direction == "west"
        })
    },
    renderStyles: function() {
        return {
            top: this.props.data.y - this.props.data.radius + "em",
            left: this.props.data.x - this.props.data.radius + "em",
            width: this.props.data.radius * 2 + "em",
            height: this.props.data.radius * 2 + "em"
        }
    }
})

module.exports = Nonplayer
