var Person = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            zIndex: 2,
            position: "absolute",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            top: this.props.data.y - (this.props.data.scale / 2) + "em",
            left: this.props.data.x - (this.props.data.scale / 2) + "em",
            width: this.props.data.scale + "em",
            height: this.props.data.scale + "em",
            borderRadius: "1em",
            backgroundColor: "#ED1C24",
        }
    }
    /*renderClasses: function() {
        return React.addons.classSet({
            "player": true,
            "dead": this.props.data.status == "dead",
            "moving": this.props.data.isAttacking <= 1,
            "attacking": this.props.data.isAttacking > 1,
            "north": this.props.data.direction == "north",
            "south": this.props.data.direction == "south",
            "east": this.props.data.direction == "east",
            "west": this.props.data.direction == "west",
            "victory": this.props.data.status != "dead" && this.state.playthrough.finished
        })
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
    }*/
})

module.exports = Person
