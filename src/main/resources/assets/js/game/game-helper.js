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

    static getName(game, side) {
        if (GameHelper.isTeamGame(game)) {
            return GameHelper.getGameTeam(game, side).team.name;
        } else {
            return GameHelper.getGamePlayer(game, side).player.name;
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