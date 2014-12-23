var PlayView = require("<root>/scripts/views/PlayView")
var CurrentViewStore = require("<root>/scripts/stores/CurrentViewStore")

var Frame = React.createClass({
    mixins: [
        Reflux.connect(CurrentViewStore, "view")
    ],
    render: function() {
        var View = this.state.view
        return (
            <div id="frame">
                <View/>
            </div>
        )
    }
})

module.exports = Frame
