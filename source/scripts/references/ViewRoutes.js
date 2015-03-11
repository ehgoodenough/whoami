var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute

var Game = require("<scripts>/components/Game")
var LobbyView = require("<scripts>/views/LobbyView")
var TitlescreenView = require("<scripts>/views/TitlescreenView")

var ViewRoutes = (
    <Route name="game" path="/" handler={Game}>
        <DefaultRoute name="title" handler={TitlescreenView}/>
        <Route name="lobby" path="/game/:name" handler={LobbyView}/>
    </Route>
)

module.exports = ViewRoutes
