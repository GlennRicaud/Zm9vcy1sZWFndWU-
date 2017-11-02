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

        this.rankings = league.leaguePlayers.map(leaguePlayer => new PlayerRankingListItem(leaguePlayer).init());
    }
}

class PlayerRankingListItem extends RankingListItem {
    constructor(leaguePlayer) {
        super({
            callback: () => RcdHistoryRouter.setState('player', {id: leaguePlayer.player.id})
        });
        this.pos = new RcdTextDivElement(leaguePlayer.ranking).init().addClass('pos');
        this.img = new ImageIcon(leaguePlayer.player.imageUrl).init().addClass('img');
        this.name = new RcdTextDivElement(leaguePlayer.player.name).init().addClass('name');
        this.pts = new RcdTextDivElement(leaguePlayer.rating).init().addClass('pts');
    }
}