var Link = ReactRouter.Link

var TitleScreenView = React.createClass({
    componentWillUnmount: function() {
        new Audio("./assets/sounds/hoo.mp3").play()
    },
    render: function() {
        return (
            <div className="title-screen view">
                <header>
                    <h1>whoami?</h1>
                    <h2>a game of utter confusion</h2>
                </header>
                <menu>
                    <Link to="game-type">
                        Play!! :D
                    </Link>
                </menu>
                <aside>
                    2.0!
                </aside>
                <img src="./assets/images/player.pose.png"/>
            </div>
        )
    }
})

module.exports = TitleScreenView
