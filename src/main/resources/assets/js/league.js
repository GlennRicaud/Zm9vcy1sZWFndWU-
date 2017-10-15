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
                latestGames: games(first:10) {
                    id
                    time
                    finished
                    gameTeams {
                        side
                        score
                        scoreAgainst
                        team {
                            name
                            imageUrl
                        }
                      }
                    gamePlayers {
                        side
                        score
                        scoreAgainst
                        player {
                            name
                            imageUrl
                        }
                    }    
                }
            }
        }`
    }

    refresh() {
        this.clear();
        return this.retrieveLeague().then(league => {
            FoosLeagueApplication.getInstance().setTitle(league.name);

            if (league.latestGames.length > 0) {
                this.addChild(new GamePanel(league.latestGames[0], 'Latest game').init());
            }
        });
    }

    retrieveLeague() {
        return GraphQlService.fetch(this.query, {id: RcdHistoryRouter.getParameters().id})
            .then(data => data.league);
    }
}