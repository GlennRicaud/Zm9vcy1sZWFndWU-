class FoosLeagueApplication extends RcdMaterialSinglePageApplication {
    constructor() {
        super({
            title:'Foos League',
            nav: {
                behaviour: RcdMaterialNavigationDrawerBehaviour.TEMPORARY
            }
        });
    }

    static getInstance() {
        if (!FoosLeagueApplication.instance) {
            FoosLeagueApplication.instance = new FoosLeagueApplication().init();
        }
        return FoosLeagueApplication.instance;
    }

    init() {
        return super.init()
            .addRoute(new LeaguesRoute().init())
            .addRoute(new LeagueRoute().init());
    }
}
