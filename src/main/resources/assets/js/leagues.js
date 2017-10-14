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
        return fetch('/_/service/com.enonic.app.officeleague/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: '{leagues{id, name}}'
            })
        }).then(response => response.json())
            .then(json => json.data.leagues);
        //TODO Handle errors
    }
}

class LeagueRow extends RcdDivElement {
    constructor(league) {
        super();
        this.league = league;
    }

    init() {
        const leagueName = new RcdTextDivElement(this.league.name).init();
        return super.init()
            .addClass('row')
            .addClass('rcd-clickable')
            .addChild(leagueName);
    }
}