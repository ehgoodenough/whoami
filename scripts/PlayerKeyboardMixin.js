var PlayerConfig = {
    "1": {
        "input": {
            "keyboard": {
                "move up": "w",
                "move down": "s",
                "move left": "a",
                "move right": "d"
            }
        }
    }
    /* 
        todo: load from json
    */
}

var PlayerKeyboardMixin = {
    componentWillMount: function() {
        for(var eventname in this.events) {
            var event = this.events[eventname].bind(this)
            var config = PlayerConfig[this.props.id]
            var keyname = config.input.keyboard[eventname]
            PlayerKeyboard.bindEvent(keyname, event)
        }
    },
    componentWillUnmount: function() {
        for(var eventname in this.events) {
            var event = this.events[eventname].bind(this)
            var config = PlayerConfig[this.props.id]
            var keyname = config.input.keyboard[eventname]
            PlayerKeyboard.unbindEvent(keyname, event)
        }
    }
}

var PlayerKeyboard = {
    events: new Object(),
    bindEvent: function(keyname, event) {
        var keycode = this.getKeycode(keyname)
        this.events[keycode] = event
    },
    unbindEvent: function(keyname, event) {
        var keycode = this.getKeyCode(keyString)
        this.events[keycode] = null
    },
    strokes: new Object(),
    onStroke: function(keycode) {
        if(!this.strokes[keycode]) {
            this.strokes[keycode] = true
            if(this.events[keycode]) {
                this.events[keycode]()
            }
        }
    },
    onUnstroke: function(keycode) {
        if(this.strokes[keycode] != null) {
            this.strokes[keycode] = null
        }
    },
    keycodes: {
        "backspace":    8,
        "tab":          9,
        "enter":        13,
        "return":       13,
        "shift":        16,
        "ctrl":         17,
        "alt":          18,
        "pause":        19,
        "break":        19,
        "caps lock":    20,
        "escape":       27,
        "space bar":    32,
        "page up":      33,
        "page down":    34,
        "end":          35,
        "home":         36,
        "left arrow":   37,
        "up arrow":     38,
        "right arrow":  39,
        "down arrow":   40,
        "insert":       45,
        "delete":       46,
        "0":            48,
        "1":            49,
        "2":            50,
        "3":            51,
        "4":            52,
        "5":            53,
        "6":            54,
        "7":            55,
        "8":            56,
        "9":            57,
        "a":            65,
        "b":            66,
        "c":            67,
        "d":            68,
        "e":            69,
        "f":            70,
        "g":            71,
        "h":            72,
        "i":            73,
        "j":            74,
        "k":            75,
        "l":            76,
        "m":            77,
        "n":            78,
        "o":            79,
        "p":            80,
        "q":            81,
        "r":            82,
        "s":            83,
        "t":            84,
        "u":            85,
        "v":            86,
        "w":            87,
        "x":            88,
        "y":            89,
        "z":            90,
        "left window":  91,
        "right window": 92,
        "select":       93,
        "numpad 0":     96,
        "numpad 1":     97,
        "numpad 2":     98,
        "numpad 3":     99,
        "numpad 4":     100,
        "numpad 5":     101,
        "numpad 6":     102,
        "numpad 7":     103,
        "numpad 8":     104,
        "numpad 9":     105,
        "numpad *":     106,
        "numpad +":     107,
        "numpad -":     109,
        "numpad .":     110,
        "numpad /":     111,
        "f1":           112,
        "f2":           113,
        "f3":           114,
        "f4":           115,
        "f5":           116,
        "f6":           117,
        "f7":           118,
        "f8":           119,
        "f9":           120,
        "f10":          121,
        "f11":          122,
        "f12":          123,
        "num lock":     144,
        "scroll lock":  145,
        ",":            186,
        "=":            187,
        ",":            188,
        "-":            189,
        ".":            190,
        "/":            191,
        "`":            192,
        "[":            219,
        "\\":           220,
        "]":            221,
        "'":            222
    },
    getKeycode: function(keyname) {
        if(this.keycodes[keyname] != null) {
            return this.keycodes[keyname]
        } else {
            throw keyname + " is not a keyname!"
        }
    }
}

document.addEventListener("keydown", function(event) {
    PlayerKeyboard.onStroke(event.keyCode)
})

document.addEventListener("keyup", function(event) {
    PlayerKeyboard.onUnstroke(event.keyCode)
})

module.exports = PlayerKeyboardMixin
