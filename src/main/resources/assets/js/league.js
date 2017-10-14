class LeagueRoute extends RcdMaterialRoute {
    constructor() {
        super({
            state: 'league',
            //iconArea: new RcdImageIconArea(config.baseUrl + '/icons/leagues.svg').init()
        });
        this.layout = new LeagueLayout().init();
    }

    init() {
        this.callback = (main) => {
            this.layout.refresh()
                .then(() => main.addChild(this.layout));
        }
        return this;
    }
}

class LeagueLayout extends RcdMaterialLayout {
    constructor() {
        super();
        this.query = `query($id:ID){
            league(id:$id){
                id,
                name,
                leaguePlayers(sort:"rating DESC") {
                    player {
                        name
                        imageUrl
                    }
                    rating
                    ranking
                }
            }
        }`
    }

    refresh() {
        this.clear();
        return this.retrieveLeague().then(league => {
            FoosLeagueApplication.getInstance().setTitle(league.name);
            league.leaguePlayers.map(leaguePlayer => new LeaguePlayerRow(leaguePlayer).init())
                .forEach(leaguePlayerRow => this.addChild(leaguePlayerRow));
        });
    }

    retrieveLeague() {
        return GraphQlService.fetch(this.query, {id: RcdHistoryRouter.getParameters().id})
            .then(data => data.league);
    }
}

class LeaguePlayerRow extends RcdDivElement {
    constructor(leaguePlayer) {
        super();
        this.leaguePlayer = leaguePlayer;
        this.player = leaguePlayer.player;
        this.playerImage = new RcdImageIcon(config.officeLeagueAppUrl + this.player.imageUrl)
            .addClass('row-image')
            .init();
        this.playerName = new RcdTextDivElement('#' + this.leaguePlayer.ranking + ' - ' + this.player.name)
            .addClass('row-text')
            .init();
        this.playerRating = new RcdTextDivElement(this.leaguePlayer.rating)
            .addClass('row-text')
            .init();
        this.left = new RcdDivElement().init()
            .addClass('rcd-flex-hbox')
            .addChild(this.playerImage)
            .addChild(this.playerName);
        this.right = new RcdDivElement().init()
            .addChild(this.playerRating);
    }

    init() {
        return super.init()
            .addClass('row')
            .addClass('row-league-player')
            .addClass('rcd-clickable')
            .addChild(this.left)
            .addChild(this.right)
            .addClickListener(() => RcdHistoryRouter.setState('player', {id: this.player.id}))
    }
}