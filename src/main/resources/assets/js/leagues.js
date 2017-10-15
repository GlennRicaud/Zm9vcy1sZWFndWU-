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
            leagues.map(league => new LeagueRow(league).init())
                .forEach(leagueRow => this.addChild(leagueRow));
        });
    }

    retrieveLeagues() {
        return GraphQlService.fetch(this.query)
            .then(data => data.leagues);
    }
}

class LeagueRow extends RcdDivElement {
    constructor(league) {
        super();
        this.league = league;
        this.leagueImage = new ImageIcon( this.league.imageUrl)
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