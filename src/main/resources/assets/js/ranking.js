class RankingPanel extends Panel {
}

class PlayerRankingPanel extends RankingPanel {
    constructor(league, title) {
        super({
            title: title || 'Player ranking',
            action: {
                text: 'View all',
                callback: () => RcdHistoryRouter.setState('player-ranking', {id: league.id})
            }
        });

        this.listHeader = new RcdDivElement().init()
            .addClass('header')
            .addChild(new RcdTextDivElement('Pos').init().addClass('pos'))
            .addChild(new RcdTextDivElement('Player').init().addClass('name'))
            .addChild(new RcdTextDivElement('Pts').init().addClass('pts'));

        this.playerRankings = league.leaguePlayers.map(leaguePlayer => new PlayerRankingListItem(leaguePlayer).init());
    }

    init() {
        return super.init().addClass('player-ranking-panel');
    }

    addPanelContent() {
        return this.addChild(this.listHeader)
            .addChildren(this.playerRankings);
    }
}

class PlayerRankingListItem extends ListItem {
    constructor(leaguePlayer) {
        super({
            callback: () => RcdHistoryRouter.setState('player', {id: leaguePlayer.player.id})
        });
        this.pos = new RcdTextDivElement(leaguePlayer.ranking).init().addClass('pos');
        this.img = new ImageIcon(leaguePlayer.player.imageUrl).init().addClass('img');
        this.name = new RcdTextDivElement(leaguePlayer.player.name).init().addClass('name');
        this.pts = new RcdTextDivElement(leaguePlayer.rating).init().addClass('pts');
    }

    init() {
        return super.init()
            .addChild(this.pos)
            .addChild(this.img)
            .addChild(this.name)
            .addChild(this.pts);
    }
}
    
