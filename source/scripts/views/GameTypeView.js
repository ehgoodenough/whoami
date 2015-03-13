var Link = ReactRouter.Link

var GameTypeView = React.createClass({
    componentDidMount: function() {
        new Audio("./assets/sounds/hoo.mp3").play()
    },
    render: function() {
        return (
            <div className="game-type view">
                <div className="selectable-game-type">
                    <Link to="offline-game-list">
                        Classic
                    </Link>
                    <small>
                        Local Offline Multiplayer
                    </small>
                    <small>
                        (Particullarly Confusing)
                    </small>
                </div>
                <div className="selectable-game-type">
                    <Link to="online-game-list">
                        Online
                    </Link>
                    <small>
                         Global Online Multiplayer
                    </small>
                    <small>
                        (Still Just as Confusing)
                    </small>
                </div>
            </div>
        )
    }
})

module.exports = GameTypeView
