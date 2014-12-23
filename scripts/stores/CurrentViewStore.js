var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var TitleView = require("<root>/scripts/views/TitleView")

var CurrentViewStore = Reflux.createStore({
    listenables: CurrentViewActions,
    onChangeView: function(View) {
        this.trigger(View)
    },
    getInitialState: function() {
        return TitleView
    }
})

module.exports = CurrentViewStore
