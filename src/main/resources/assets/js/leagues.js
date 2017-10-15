class LeaguesRoute extends RcdMaterialRoute {
    constructor() {
        super({
            state: 'leagues',
            name: 'Leagues',
            //iconArea: new RcdImageIconArea(config.baseUrl + '/icons/leagues.svg').init()
        });
        this.layout = new LeaguesLayout().init();
    }

    init() {
        this.callback = (main) => {
            this.layout.refresh()
                .then(() => main.addChild(this.layout));
        }
        return this;
    }
}

class LeaguesLayout extends RcdMaterialLayout {
    constructor() {
        super();
        this.query = `{
            leagues{
                id,
                name,
                imageUrl
            }
        }`
    }

    refresh() {
        this.clear();
        return this.retrieveLeagues().then(leagues => {
            leagues.map(league => new LeagueResult(league).init())
                .forEach(leagueResult => this.addChild(leagueResult));
        });
    }

    retrieveLeagues() {
        return GraphQlService.fetch(this.query)
            .then(data => data.leagues);
    }
}

class LeagueResult extends ResultItem {
    constructor(league) {
        super({
            image: league.imageUrl,
            text: league.name,
            callback: () => RcdHistoryRouter.setState('league', {id: league.id})
        });
    }
}