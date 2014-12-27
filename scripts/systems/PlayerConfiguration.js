var PlayerConfiguration = {
    0: {
        "name": "arrows",
        "input": {
            "keyboard": {
                "move north": "up arrow",
                "move south": "down arrow",
                "move west": "left arrow",
                "move east": "right arrow",
                "attack": "."
            }
        }
    },
    1: {
        "name": "w-a-s-d",
        "input": {
            "keyboard": {
                "move north": "w",
                "move south": "s",
                "move west": "a",
                "move east": "d",
                "attack": "e"
            }
        }
    },
    2: {
        "name": "j-i-k-l",
        "input": {
            "keyboard": {
                "move north": "i",
                "move south": "k",
                "move west": "j",
                "move east": "l",
                "attack": "o"
            }
        }
    },
    /*3: {
        "name": "numpad",
        "input": {
            "keyboard": {
                "move north": "numpad 5",
                "move south": "numpad 2",
                "move west": "numpad 1",
                "move east": "numpad 3"
            }
        }
    },*/
    4: {
        "name": "f-g-h-t",
        "input": {
            "keyboard": {
                "move north": "t",
                "move south": "g",
                "move west": "f",
                "move east": "h",
                "attack": "y"
            }
        }
    }
}

module.exports = PlayerConfiguration
