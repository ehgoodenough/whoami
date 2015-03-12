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
            "dead": this.props.data.status == "dead",
            "north": this.props.data.direction == "north",
            "south": this.props.data.direction == "south",
            "east": this.props.data.direction == "east",
            "west": this.props.data.direction == "west"
        })
    },
    renderStyles: function() {
        return {
            top: this.props.data.y - (this.props.data.scale / 2) + "em",
            left: this.props.data.x - (this.props.data.scale / 2) + "em",
            width: this.props.data.scale + "em",
            height: this.props.data.scale + "em"
        }
    }
})

module.exports = Nonplayer
