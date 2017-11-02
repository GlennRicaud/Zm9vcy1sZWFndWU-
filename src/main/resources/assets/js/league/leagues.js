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
            leagues(first:-1){
                id,
                name,
                imageUrl
                games(first:1 , finished:true) {
                    time
                }
            }
        }`
    }

    refresh() {
        this.clear();
        return this.retrieveLeagues().then(leagues => {
            leagues.sort(this.compareLeagues)
                .map(league => new LeagueResult(league).init())
                .forEach(leagueResult => this.addChild(leagueResult));
        });
    }

    retrieveLeagues() {
        return GraphQlService.fetch(this.query)
            .then(data => data.leagues);
    }

    compareLeagues(league1, league2) {
        if (league1.games.length === 0) {
            if (league2.games.length === 0) {
                return 0;
            } else {
                return 1;
            }
        }
        if (league2.games.length === 0) {
            return -1;
        }
        return league2.games[0].time.localeCompare(league1.games[0].time);
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