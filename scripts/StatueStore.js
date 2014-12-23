//var StatueActions = require("./StatueActions")

var StatueStore = Reflux.createStore({
    data: {
        "A": {
            x: 5,
            y: 5,
            width: 2,
            height: 2
        }
    },
    getInitialState: function() {
        return this.data
    },
})

module.exports = StatueStore
