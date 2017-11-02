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
    
