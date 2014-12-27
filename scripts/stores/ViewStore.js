var ViewActions = require("<root>/scripts/actions/ViewActions")

var ViewStore = Reflux.createStore({
    listenables: [
        ViewActions,
    ],
    views: {
        "TitleView": require("<root>/scripts/views/TitleView"),
        "JoinView": require("<root>/scripts/views/JoinView"),
        "PlaythroughView": require("<root>/scripts/views/PlaythroughView")
    },
    onChangeTo: function(view) {
        this.trigger(this.views[view])
    },
    getInitialState: function() {
        return this.views["TitleView"]
    }
})

module.exports = ViewStore
