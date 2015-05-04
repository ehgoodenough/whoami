var Person = require("<scripts>/components/Person")
var GameFrame = require("<scripts>/references/GameFrame")

var isOverlapping = function(a, b) {
    var x = a.position.x - b.position.x
    var y = a.position.y - b.position.y
    var d = Math.sqrt(x * x + y * y)
    var l = (a.scale / 2) + (b.scale / 2)
    return d < l
}

var PlayerStore = Phlux.createStore({
    data: {
        "a": {
            id: "a",
            status: "not dead",
            direction: "south",
            position: {
                x: 5,
                y: 5
            },
            scale: 1,
            speed: 2.5,
            attacking: 0,
            input: {
                "move north": "W",
                "move south": "S",
                "move west": "A",
                "move east": "D",
                "attack": "E",
            }
        },
        "b": {
            id: "b",
            status: "not dead",
            direction: "south",
            position: {
                x: 10,
                y: 10
            },
            scale: 1,
            speed: 2.5,
            attacking: 0,
            input: {
                "move north": "<up>",
                "move south": "<down>",
                "move west": "<left>",
                "move east": "<right>",
                "attack": ".",
            }
        }
    },
    update: function(tick) {
        for(var id in this.data) {
            var player = this.data[id]
            if(player.state == "dead") {
                continue
            }
            if(Keyb.isDown(player.input["move north"])) {
                player.position.y -= player.speed * tick
                player.direction = "north"
            }
            if(Keyb.isDown(player.input["move south"])) {
                player.position.y += player.speed * tick
                player.direction = "south"
            }
            if(Keyb.isDown(player.input["move west"])) {
                player.position.x -= player.speed * tick
                player.direction = "west"
            }
            if(Keyb.isDown(player.input["move east"])) {
                player.position.x += player.speed * tick
                player.direction = "east"
            }
            if(Keyb.isDown(player.input["attack"])) {
                if(player.attacking <= 0) {
                    this.handleAttack(player)
                    player.attacking = 3/4
                    player.scale *= 1.5
                    player.speed *= 1.5
                }
            }
            if(player.attacking > 0) {
                player.attacking -= tick
                if(player.attacking <= 0) {
                    player.attacking = 0
                    player.scale /= 1.5
                    player.speed /= 1.5
                }
            }
            this.trigger()
        }
    },
    handleAttack: function(attacker) {
        for(var id in this.data) {
            var attackee = this.data[id]
            if(attackee.status == "dead") {
                continue
            }
            if(attackee.id != attacker.id) {
                if(isOverlapping(attacker, attackee)) {
                    attackee.status = "dead"
                }
            }
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
                {this.renderEntities(Person, this.state.players)}
            </GameFrame>
        )
    },
    renderEntities: function(Class, data) {
        var renderings = []
        for(var id in data) {
            renderings.push(
                <Class key={id}
                    data={data[id]}/>
            )
        }
        return renderings
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            PlayerStore.update(tick)
        }.bind(this))
    }
})

module.exports = Game
