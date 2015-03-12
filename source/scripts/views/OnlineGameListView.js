var Link = ReactRouter.Link

var OnlineGameListView = React.createClass({
    getInitialState: function() {
        return {
            "games": {}
        }
    },
    componentDidMount: function() {
        this.firebase = new Firebase("https://uhwhoami.firebaseIO.com/games")
        this.firebase.on("value", this.updateState)
    },
    componentWillUnmount: function() {
        new Audio("./assets/sounds/ahoo.mp3").play()
        this.firebase.off("value", this.updateState)
    },
    updateState: function(data) {
        this.setState({"games": data.val() || {}})
    },
    render: function() {
        return (
            <div className="game-list view">
                <div id="make-game">
                    <h3>Make Game</h3>
                    <form onSubmit={this.onMakeGame}>
                        <div className="make-game-section">
                            <label htmlFor="name">Name of session?</label>
                            <input ref="name" id="name" type="text"/>
                        </div>
                        <div className="make-game-section">
                            <label htmlFor="maxsize">Number of players?</label>
                            <input ref="maxsize" id="maxsize" type="text"
                                placeholder="5"/>
                        </div>
                        {this.renderMakeGameErrors()}
                        <input type="submit"/>
                    </form>
                </div>
                <div id="join-game">
                    <h3>Join Game</h3>
                    {this.renderJoinableGames()}
                </div>
            </div>
        )
    },
    renderJoinableGames: function() {
        var renderings = []
        for(var name in this.state.games) {
            var game = this.state.games[name]
            if(game.type != "private") {
                var size = 0
                if(game.players) {
                    size = Object.keys(game.players).length
                }
                renderings.push(
                    <div className="joinable-game" key={name}>
                        <Link to="online-game" params={{"name": name}}
                            onClick={this.onExitView}>
                            {name + " (" + size + "/" + game.maxsize + ")"}
                        </Link>
                    </div>
                )
            }
        }
        if(renderings.length == 0) {
            renderings = (
                <div id="join-game-error">
                    There are no games to join!
                </div>
            )
        }
        return renderings
    },
    renderMakeGameErrors: function() {
        if(this.state.error) {
            return (
                <div id="make-game-error">
                    {this.state.error}
                </div>
            )
        }
    },
    onMakeGame: function(event) {
        event.preventDefault()
        var name = this.refs["name"].getDOMNode().value
        var maxsize = this.refs["maxsize"].getDOMNode().value || 5
        if(!name) {
            this.setState({"error": "Whoops! You forgot to give a name."})
            return
        }
        if(this.state.games[name] != undefined) {
            this.setState({"error": "Uh oh! That name already exists."})
            return
        }
        if(maxsize > 20) {
            this.setState({"error": "Wowza! That's too many players!"})
            return
        }
        this.firebase.child(name).set({
            "maxsize": maxsize
        })
        window.location += "/" + name
    }
})

module.exports = OnlineGameListView
