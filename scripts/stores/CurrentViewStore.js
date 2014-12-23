var CurrentViewActions = require("<root>/scripts/actions/CurrentViewActions")
var TitleView = require("<root>/scripts/views/TitleView")
var JoinView = require("<root>/scripts/views/JoinView")
var PlayView = require("<root>/scripts/views/PlayView")

var CurrentViewStore = Reflux.createStore({
    listenables: CurrentViewActions,
    onChangeView: function(View) {
        this.trigger(View)
    },
    getInitialState: function() {
        return PlayView
    }
})

module.exports = CurrentViewStore
