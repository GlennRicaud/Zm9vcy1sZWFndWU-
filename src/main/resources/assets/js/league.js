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
                leaguePlayers(sort:"rating DESC", first:8) {
                    player {
                        name
                        imageUrl
                    }
                    rating
                    ranking
                }
                leagueTeams(sort:"rating DESC", first:16) {
                    team {
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
    
    init() {
        return super.init().addClass('league-layout');
    }

    refresh() {
        this.clear();
        return this.retrieveLeague().then(league => {
            FoosLeagueApplication.getInstance().setTitle(league.name);

            const leftColumn = new RcdDivElement().init().addClass('left-column');
            const rightColumn = new RcdDivElement().init().addClass('right-column');
            if (league.latestGames.length > 0) {
                leftColumn.addChild(new GamePanel(league.latestGames[0], 'Latest game').init());
                leftColumn.addChild(new GamesPanel(league.latestGames, 'Latest games', {
                    text: 'View All',
                    callback: () => RcdHistoryRouter.setState('games', {leagueId: league.id})
                }).init());
            }
            if (league.leaguePlayers.length > 0) {
                rightColumn.addChild(new PlayerRankingPanel(league, 'Players - Division 1').init());
                rightColumn.addChild(new TeamRankingPanel(league, 'Teams - Division 1').init());
            }

            this.addChild(leftColumn)
                .addChild(rightColumn);
        });
    }

    retrieveLeague() {
        return GraphQlService.fetch(this.query, {id: RcdHistoryRouter.getParameters().id})
            .then(data => data.league);
    }
}