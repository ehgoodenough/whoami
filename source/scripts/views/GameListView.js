var Link = ReactRouter.Link

var GameListView = React.createClass({
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
        this.firebase.off("value", this.updateState)
    },
    updateState: function(data) {
        this.setState({"games": data.val()})
    },
    render: function() {
        return (
            <div className="game-list view">
                <div id="make-game">
                    <h3>Make Game</h3>
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
                var size = Object.keys(game.players).length
                renderings.push(
                    <div className="joinable-game" key={name}>
                        <Link to="game-lobby" params={{"name": name}}>
                            {name + " (" + size + "/" + game.maxsize + ")"}
                        </Link>
                    </div>
                )
            }
        }
        if(renderings.length == 0) {
            renderings = (
                <div id="no-joinable-games">
                    There are no games to join!
                </div>
            )
        }
        return renderings
    }
})

module.exports = GameListView
