class GamePanel extends Panel {
    constructor(game, title) {
        super(title || game.time)
        this.game = game;
    }
}

class GameHelper {
    static isTeamGame(game) {
        return game.gameTeams && game.gameTeams.length == 2;
    }
}