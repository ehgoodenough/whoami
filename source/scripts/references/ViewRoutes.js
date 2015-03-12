var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute
var Redirect = ReactRouter.Redirect

var Game = require("<scripts>/components/Game")
var LobbyView = require("<scripts>/views/LobbyView")
var GameListView = require("<scripts>/views/GameListView")
var TitlescreenView = require("<scripts>/views/TitlescreenView")

var ViewRoutes = (
    <Route path="/" handler={Game}>
        <DefaultRoute name="title" handler={TitlescreenView}/>
        <Route name="game-list" path="/game" handler={GameListView}/>
        <Route name="game-lobby" path="/game/:name" handler={LobbyView}/>
        <Redirect from="/game/?" to="game-list"/>
    </Route>
)

module.exports = ViewRoutes
