class FoosLeagueApplication extends RcdMaterialSinglePageApplication {
    constructor() {
        super('Foos League');
    }

    init() {
        return super.init()
            .addRoute(new LeaguesRoute().init());
    }
}

new FoosLeagueApplication().init().start();