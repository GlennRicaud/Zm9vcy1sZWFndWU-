class RankingPanel extends Panel {
}

class PlayerRankingPanel extends RankingPanel {
    constructor(params) {
        super({
            title: params.title || 'Player ranking',
            action: {
                text: 'View all',
                callback: () => RcdHistoryRouter.setState('player-ranking', {id: params.league.id})
            }
        });
    }
}
    
