window.React = require("react")
window.Reflux = require("reflux")

var Frame = require("<root>/scripts/Frame")
React.render(<Frame/>, document.body)

window.EventSystem = require("<root>/scripts/systems/EventSystem")
