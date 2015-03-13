var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute
var Redirect = ReactRouter.Redirect

var Game = require("<scripts>/components/Game")
var TitleScreenView = require("<scripts>/views/TitleScreenView")
var GameTypeView = require("<scripts>/views/GameTypeView")
var OnlineGameListView = require("<scripts>/views/OnlineGameListView")
var OnlineGameView = require("<scripts>/views/LobbyView")
var OfflineGameListView = require("<scripts>/views/OfflineGameListView")
var OfflineGameView = require("<scripts>/views/OfflineGameView")

var ViewRoutes = (
    <Route path="/" handler={Game}>
        <DefaultRoute name="title" handler={TitleScreenView}/>
        <Route name="game-type" path="/game" handler={GameTypeView}/>
        
        <Route name="online-game-list" path="/game/online" handler={OnlineGameListView}/>
        <Redirect from="/game/online/?" to="online-game-list"/>
        <Route name="online-game" path="/game/online/:name" handler={OnlineGameView}/>
        
        <Route name="offline-game-list" path="/game/classic" handler={OfflineGameListView}/>
        <Redirect from="/game/classic/?" to="offline-game-list"/>
        <Route name="offline-game" path="/game/classic/:size" handler={OfflineGameView}/>
    </Route>
)

module.exports = ViewRoutes
