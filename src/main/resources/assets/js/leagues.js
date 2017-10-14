class LeaguesRoute extends RcdMaterialRoute {
    constructor() {
        super({
            state: 'leagues',
            name: 'Leagues',
            //iconArea: new RcdImageIconArea(config.baseUrl + '/icons/leagues.svg').init()
        });
    }

    init() {
        const layout = new LeaguesLayout().init();
        this.callback = (main) => {
            main.addChild(layout);
            layout.refresh();
        }
        return this;
    }
}

class LeaguesLayout extends RcdMaterialLayout {

    refresh() {
        this.retrieveLeagues().then(leagues => {
            leagues.map(league => new LeagueRow(league).init())
                .forEach(leagueRow => this.addChild(leagueRow));
        });
    }

    retrieveLeagues() {
        return GraphQlService.fetch('{leagues(first:-1){id, name, imageUrl}}')
            .then(data => data.leagues);
    }
}

class LeagueRow extends RcdDivElement {
    constructor(league) {
        super();
        this.league = league;
        this.leagueImage = new RcdImageIcon(config.officeLeagueAppUrl + this.league.imageUrl)
            .addClass('row-image')
            .init();
        this.leagueName = new RcdTextDivElement(this.league.name)
            .addClass('row-text')
            .init();
    }

    init() {
        return super.init()
            .addClass('row')
            .addClass('rcd-clickable')
            .addChild(this.leagueImage)
            .addChild(this.leagueName)
            .addClickListener(() => RcdHistoryRouter.setState('league', {id: this.league.id}))
    }
}