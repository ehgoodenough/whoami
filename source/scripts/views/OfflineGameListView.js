var Link = ReactRouter.Link

var OfflineGameView = React.createClass({
    componentDidMount: function() {
        new Audio("./assets/sounds/hoo.mp3").play()
    },
    render: function() {
        return (
            <div id="offline-game-list" className="view">
                <div className="box">
                    <Link to="offline-game" params={{size: 1}}>
                        <h3>1 Player</h3>
                    </Link>
                </div>
                <div className="box">
                    <Link to="offline-game" params={{size: 2}}>
                        <h3>2 Player</h3>
                    </Link>
                </div>
                <div className="box">
                    <Link to="offline-game" params={{size: 3}}>
                        <h3>3 Player</h3>
                    </Link>
                </div>
                <div className="box">
                    <Link to="offline-game" params={{size: 4}}>
                        <h3>4 Player</h3>
                    </Link>
                </div>
            </div>
        )
    }
})

module.exports = OfflineGameView
