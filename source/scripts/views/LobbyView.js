var LobbyView = React.createClass({
    componentDidMount: function() {
        this.firebase = new Firebase("https://uhwhoami.firebaseIO.com/games")
        this.firebase = this.firebase.child(this.props.params.name)
        
        this.firebase.child("players").on("value", function(data) {
            this.setState(data.val())
        }.bind(this))
        this.firebase.child("players").child("andrew").set({
            "x": 1,
            "y": 1
        })
        //this.firebase.child("players").child("andrew").onDisconnect().remove()
    },
    render: function() {
        return (
            <div className="view">
                {this.state}
            </div>
        )
    }
})

module.exports = LobbyView
