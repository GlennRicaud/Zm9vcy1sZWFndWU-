class GamesPanel extends Panel {
    constructor(games, title, action) {
        super({
            title: title,
            action: action
        });
        this.gameListItems = games.map(game => new GameListItem(game).init());
    }

    addPanelContent() {
        return super.addPanelContent()
            .addChildren(this.gameListItems);
    }
}

class GameListItem extends ListItem {
    constructor(game) {
        super({
            callback: () => RcdHistoryRouter.setState('game', {id: game.id})
        });
        this.blueName = new RcdTextDivElement(GameHelper.getName(game, GameSide.BLUE))
            .init()
            .addClass('game-side-name');
        this.redName = new RcdTextDivElement(GameHelper.getName(game, GameSide.RED))
            .init()
            .addClass('red-side')
            .addClass('game-side-name');
        const blueImage = new ImageIcon(GameHelper.getImage(game, GameSide.BLUE))
            .init();
        const redImage = new ImageIcon(GameHelper.getImage(game, GameSide.RED))
            .init();
        const score = new GameScore(game).init();
        this.center = new RcdDivElement().init()
            .addClass('center')
            .addChild(blueImage)
            .addChild(score)
            .addChild(redImage);
    }

    init() {
        return super.init()
            .addClass('game-list-item')
            .addChild(this.blueName)
            .addChild(this.center)
            .addChild(this.redName);
    }
}