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
                games {
                    id
                    time
                    finished
                    gameTeams {
                        side
                        team {
                            name
                            imageUrl
                        }
                      }
                    gamePlayers {
                        side
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

            if (league.games.length > 0) {
                this.addChild(new GamePanel(league.games[0]).init(), 'Latest game');
            }
        });
    }

    retrieveLeague() {
        return GraphQlService.fetch(this.query, {id: RcdHistoryRouter.getParameters().id})
            .then(data => data.league);
    }
}