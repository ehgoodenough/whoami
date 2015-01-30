var ViewActions = require("<root>/scripts/actions/ViewActions")

var ViewStore = Reflux.createStore({
    listenables: [
        ViewActions,
    ],
    views: {
        "TitlescreenView": require("<root>/scripts/views/TitlescreenView"),
        "HowmanyView": require("<root>/scripts/views/HowmanyView"),
        "PlaythroughView": require("<root>/scripts/views/PlaythroughView")
    },
    onChangeView: function(view) {
        this.trigger(this.views[view])
    },
    getInitialState: function() {
        return this.views["TitlescreenView"]
    }
})

module.exports = ViewStore