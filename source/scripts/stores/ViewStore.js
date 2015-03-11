var ViewActions = require("<scripts>/actions/ViewActions")

var ViewStore = Reflux.createStore({
    listenables: [
        ViewActions,
    ],
    views: {
        "LobbyView": require("<scripts>/views/LobbyView"),
        "TitlescreenView": require("<scripts>/views/TitlescreenView"),
        "HowmanyView": require("<scripts>/views/HowmanyView"),
        "PlaythroughView": require("<scripts>/views/PlaythroughView")
    },
    onChangeView: function(name) {
        this.trigger(this.views[name])
    },
    getInitialState: function() {
        return this.views["LobbyView"]
    }
})

module.exports = ViewStore
