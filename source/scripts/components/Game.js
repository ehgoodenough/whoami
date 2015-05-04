var Person = require("<scripts>/components/Person")
var GameFrame = require("<scripts>/references/GameFrame")

var isOverlapping = function(a, b) {
    var x = a.position.x - b.position.x
    var y = a.position.y - b.position.y
    var d = Math.sqrt(x * x + y * y)
    var l = (a.scale / 2) + (b.scale / 2)
    return d < l
}

var PlayerKeyconfigs = {
    "1": {
        "move north": "W",
        "move south": "S",
        "move west": "A",
        "move east": "D",
        "attack": "E",
    },
    "2": {
        "move north": "T",
        "move south": "G",
        "move west": "F",
        "move east": "H",
        "attack": "Y",
    },
    "3": {
        "move north": "I",
        "move south": "K",
        "move west": "J",
        "move east": "L",
        "attack": "O",
    },
    "4": {
        "move north": "<up>",
        "move south": "<down>",
        "move west": "<left>",
        "move east": "<right>",
        "attack": "<enter>",
    }
}

var dead_player_count = 0
var player_count = 3

var PlayerStore = Phlux.createStore({
    startPlaythrough: function(count) {
        for(var id = 1; id <= count; id++) {
            this.data[id] = {
                id: id,
                position: {
                    x: Math.floor(Math.random() * (WIDTH - 2)) + 1,
                    y: Math.floor(Math.random() * (HEIGHT - 2)) + 1
                },
                scale: 1,
                speed: 2.5,
                attacking: 0,
                status: "not dead",
                direction: "south",
                keyconfig: PlayerKeyconfigs[id]
            }
        }
        this.trigger()
        dead_player_count = 0 //?!
        player_count = count //?!
    },
    finishPlaythrough: function() {
        this.data = {}
    },
    updatePlayers: function(tick) {
        for(var id in this.data) {
            var player = this.data[id]
            if(player == undefined
            || player.state == "dead") {
                continue
            }
            if(Keyb.isDown(player.keyconfig["move north"])) {
                player.position.y -= player.speed * tick
                player.direction = "north"
            }
            if(Keyb.isDown(player.keyconfig["move south"])) {
                player.position.y += player.speed * tick
                player.direction = "south"
            }
            if(Keyb.isDown(player.keyconfig["move west"])) {
                player.position.x -= player.speed * tick
                player.direction = "west"
            }
            if(Keyb.isDown(player.keyconfig["move east"])) {
                player.position.x += player.speed * tick
                player.direction = "east"
            }
            if(Keyb.isDown(player.keyconfig["attack"])) {
                if(player.attacking <= 0) {
                    player.scale *= 2
                    player.speed *= 1.5
                    player.attacking = 3/4
                    this.handleAttacking(player)
                }
            }
            if(player.attacking > 0) {
                player.attacking -= tick
                if(player.attacking <= 0) {
                    player.attacking = 0
                    player.scale /= 2
                    player.speed /= 1.5
                }
            }
            this.trigger()
        }
    },
    handleAttacking: function(attacker) {
        for(var id in this.data) {
            var attackee = this.data[id]
            if(attackee.status == "dead") {
                continue
            }
            if(attackee.id != attacker.id) {
                if(isOverlapping(attacker, attackee)) {
                    attackee.status = "dead"
                    dead_player_count += 1
                    if(dead_player_count == player_count - 1) {
                        attacker.status = "everyone else is dead"
                        finishPlaythrough()
                    }
                }
            }
        }
    }
})

var startPlaythrough = function(count) {
    PlayerStore.startPlaythrough(count)
    ViewStore.startPlaythrough()
}

var finishPlaythrough = function(count) {
    PlayerStore.finishPlaythrough(count)
    ViewStore.finishPlaythrough()
}

var PlaythroughView = React.createClass({
    mixins: [
        Phlux.connectStore(PlayerStore, "players")
    ],
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.renderEntities(Person, this.state["players"])}
            </div>
        )
    },
    renderStyles: function() {
        return {
            top: "0em",
            left: "0em",
            right: "0em",
            bottom: "0em",
            position: "absolute",
            backgroundColor: "#EEE"
        }
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
            PlayerStore.updatePlayers(tick)
        })
    }
})

var ViewStore = Phlux.createStore({
    data: PlaythroughView,
    startPlaythrough: function() {
        this.data = PlaythroughView
        this.trigger()
    }
})

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(ViewStore, "view")
    ],
    render: function() {
        var CurrentView = this.state["view"]
        return (
            <GameFrame>
                <CurrentView/>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        startPlaythrough(4)
    }
})

module.exports = Game
