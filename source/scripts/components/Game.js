
var RouteHandler = ReactRouter.RouteHandler

var Loop = require("<scripts>/systems/Loop")
var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                <RouteHandler/>
            </GameFrame>
        )
    }
})

module.exports = Game
