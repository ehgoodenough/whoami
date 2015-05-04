window.React = require("react")
window.Phlux = require("phlux")
window.Tickly = require("tickly")
window.Keyb = require("keyb")

window.WIDTH = 20
window.HEIGHT = 15

var Game = require("<scripts>/components/Game")
React.render(<Game/>, document.body)
