const GameSide = {
    BLUE: 'blue',
    RED: 'read'
}

class GamePanel extends Panel {
    constructor(game, title) {
        super(title || game.time);
        this.gameScoreLine = new GameScoreLine(game).init();
    }

    init() {
        return super.init()
            .addClass('rcd-clickable')
            .addChild(this.gameScoreLine);
    }
}

class GameScoreLine extends RcdDivElement {
    constructor(game) {
        super();
        this.blueImage = new ImageIcon(GameHelper.getImage(game, GameSide.BLUE))
            .init()
            .addClass('game-score-image');
        this.redImage = new ImageIcon(GameHelper.getImage(game, GameSide.RED))
            .init()
            .addClass('game-score-image');
        this.score = new GameScore(game).init();
    }

    init() {
        return super.init()
            .addClass('game-score-line')
            .addChild(this.blueImage)
            .addChild(this.score)
            .addChild(this.redImage);
    }
}

class GameScore extends RcdDivElement {
    constructor(game) {
        super();
        this.blueScore = new RcdTextDivElement(GameHelper.getScore(game, GameSide.BLUE)).init();
        this.redScore = new RcdTextDivElement(GameHelper.getScore(game, GameSide.RED)).init();
    }

    init() {
        return super.init()
            .addClass('game-score')
            .addChild(this.blueScore)
            .addChild(new RcdTextDivElement(' - ').init())
            .addChild(this.redScore);
    }

}

class GameHelper {
    static isTeamGame(game) {
        return game.gameTeams && game.gameTeams.length == 2;
    }

    static getImage(game, side) {
        if (GameHelper.isTeamGame(game)) {
            return GameHelper.getGameTeam(game, side).team.imageUrl;
        } else {
            return GameHelper.getGamePlayer(game, side).player.imageUrl;
        }
    }

    static getScore(game, side) {
        const oppositeSide = GameHelper.getOppositeSide(side);
        if (GameHelper.isTeamGame(game)) {
            return GameHelper.getGameTeam(game, side).score + GameHelper.getGameTeam(game, oppositeSide).scoreAgainst;
        } else {
            return GameHelper.getGamePlayer(game, side).score + GameHelper.getGamePlayer(game, oppositeSide).scoreAgainst;
        }
    }

    static getOppositeSide(side) {
        return side === GameSide.BLUE ? GameSide.RED : GameSide.BLUE;
    }

    static getGameTeam(game, side) {
        return game.gameTeams[0].side === side ? game.gameTeams[0] : game.gameTeams[1];
    }

    static getGamePlayer(game, side) {
        return game.gamePlayers[0].side === side ? game.gamePlayers[0] : game.gamePlayers[1];
    }
}