class RankingPanel extends Panel {
    init() {
        return super.init().addClass('ranking-panel');
    }

    addPanelContent() {
        return this.addChild(this.listHeader)
            .addChildren(this.rankings);
    }
}

class RankingListItem extends ListItem {
    init() {
        return super.init()
            .addChild(this.pos)
            .addChild(this.img)
            .addChild(this.name)
            .addChild(this.pts);
    }
}