class RankingPanel extends Panel {
    init() {
        return super.init().addClass('ranking-panel');
    }

    addPanelContent() {
        return this.addChild(this.listHeader)
            .addChildren(this.rankings);
    }
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

        this.rankings = league.leaguePlayers.map(leaguePlayer => new PlayerRankingListItem(leaguePlayer).init());
    }
}

class TeamRankingPanel extends RankingPanel {
    constructor(league, title) {
        super({
            title: title || 'Team ranking',
            action: {
                text: 'View all',
                callback: () => RcdHistoryRouter.setState('team-ranking', {id: league.id})
            }
        });

        this.listHeader = new RcdDivElement().init()
            .addClass('header')
            .addChild(new RcdTextDivElement('Pos').init().addClass('pos'))
            .addChild(new RcdTextDivElement('Team').init().addClass('name'))
            .addChild(new RcdTextDivElement('Pts').init().addClass('pts'));

        this.rankings = league.leagueTeams.map(leagueTeam => new TeamRankingListItem(leagueTeam).init());
    }
}

class RankingListItem extends ListItem {
    init() {
        return super.init()
            .addChild(this.pos)
            .addChild(this.img)
            .addChild(this.name)
            .addChild(this.pts);
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

class TeamRankingListItem extends RankingListItem {
    constructor(leagueTeam) {
        super({
            callback: () => RcdHistoryRouter.setState('team', {id: leagueTeam.team.id})
        });
        this.pos = new RcdTextDivElement(leagueTeam.ranking).init().addClass('pos');
        this.img = new ImageIcon(leagueTeam.team.imageUrl).init().addClass('img');
        this.name = new RcdTextDivElement(leagueTeam.team.name).init().addClass('name');
        this.pts = new RcdTextDivElement(leagueTeam.rating).init().addClass('pts');
    }
}
    
