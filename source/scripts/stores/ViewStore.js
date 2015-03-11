var ViewActions = require("<scripts>/actions/ViewActions")

var ViewStore = Reflux.createStore({
    listenables: [
        ViewActions,
    ],
    views: {
        "TitlescreenView": require("<scripts>/views/TitlescreenView"),
        "HowmanyView": require("<scripts>/views/HowmanyView"),
        "PlaythroughView": require("<scripts>/views/PlaythroughView")
    },
    onChangeView: function(view) {
        this.trigger(this.views[view])
    },
    getInitialState: function() {
        return this.views["TitlescreenView"]
    }
})

module.exports = ViewStore
