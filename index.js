window.React = require("react")
window.Reflux = require("reflux")

var Frame = require("./scripts/Frame")
React.render(<Frame/>, document.body)

window.EventSystem = require("./scripts/EventSystem")
