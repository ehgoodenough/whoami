var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute
var Redirect = ReactRouter.Redirect

var Game = require("<scripts>/components/Game")
var LobbyView = require("<scripts>/views/LobbyView")
var OnlineGameListView = require("<scripts>/views/OnlineGameListView")
var TitlescreenView = require("<scripts>/views/TitlescreenView")

var ViewRoutes = (
    <Route path="/" handler={Game}>
        <DefaultRoute name="title" handler={TitlescreenView}/>
        <Route name="online-game-list" path="/game/online" handler={OnlineGameListView}/>
        <Route name="online-game" path="/game/online/:name" handler={LobbyView}/>
        <Redirect from="/game/online/?" to="online-game-list"/>
    </Route>
)

module.exports = ViewRoutes
