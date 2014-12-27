var ViewActions = require("<root>/scripts/actions/ViewActions")
var InitialView = require("<root>/scripts/views/TitleView")

var ViewStore = Reflux.createStore({
    listenables: [
        ViewActions,
    ],
    onChangeTo: function(View) {
        this.trigger(View)
    },
    getInitialState: function() {
        return InitialView
    }
})

module.exports = ViewStore
