window.React = require("react/addons")
window.Reflux = require("reflux")
window.ReactRouter = require("react-router")

window.Reflux.StoreMethods.getInitialState = function() {if(this.getData) {return this.getData()}}
window.Reflux.StoreMethods.retrigger = function() {if(this.getData) {this.trigger(this.getData())}}

var ViewRoutes = require("<scripts>/references/ViewRoutes")
ReactRouter.run(ViewRoutes, function(RenderedViews) {
    React.render(<RenderedViews/>, document.body)
})
