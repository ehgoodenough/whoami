var Person = require("<scripts>/components/Person")
var GameFrame = require("<scripts>/components/GameFrame")

var player = {
    x: 5,
    y: 5,
    scale: 1
}

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                <Person data={player}/>
            </GameFrame>
        )
    }
})

module.exports = Game
