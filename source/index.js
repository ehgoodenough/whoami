window.React = require("react/addons")
window.Reflux = require("reflux")
window.ReactRouter = require("react-router")
window.Firebase = require("firebase")

window.Reflux.StoreMethods.getInitialState = function() {if(this.getData) {return this.getData()}}
window.Reflux.StoreMethods.retrigger = function() {if(this.getData) {this.trigger(this.getData())}}

var ViewRoutes = require("<scripts>/references/ViewRoutes")
ReactRouter.run(ViewRoutes, function(RouteHandler, state) {
    React.render(<RouteHandler params={state.params}/>, document.body)
})
