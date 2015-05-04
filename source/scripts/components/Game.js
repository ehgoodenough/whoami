var Person = require("<scripts>/components/Person")
var GameFrame = require("<scripts>/references/GameFrame")

var PlayerStore = Phlux.createStore({
    data: {
        x: 5,
        y: 5,
        scale: 1,
        speed: 2.5
    },
    update: function(tick) {
        if(Keyb.isDown("W")) {
            this.data.y -= this.data.speed * tick
            this.trigger()
        }
        if(Keyb.isDown("S")) {
            this.data.y += this.data.speed * tick
            this.trigger()
        }
        if(Keyb.isDown("A")) {
            this.data.x -= this.data.speed * tick
            this.trigger()
        }
        if(Keyb.isDown("D")) {
            this.data.x += this.data.speed * tick
            this.trigger()
        }
    }
})

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(PlayerStore, "players")
    ],
    render: function() {
        return (
            <GameFrame>
                <Person data={this.state.players}/>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            PlayerStore.update(tick)
        }.bind(this))
    }
})

module.exports = Game
