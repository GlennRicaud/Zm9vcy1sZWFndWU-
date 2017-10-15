class Panel extends RcdDivElement {
    constructor(params = {}) {
        super();
        this.title = params.title && new PanelTitle(params.title).init();
        this.action = params.action && new RcdMaterialButtonArea(params.action.text, params.action.callback, RcdMaterialButtonType.FLAT)
            .init()
            .addClass('action')
            .addClass('panel-action');
    }

    init() {
        super.init().addClass('panel');
        if (this.title) {
            this.addChild(this.title);     
        }
        this.addPanelContent();
        if (this.action) {
            this.addChild(this.action);
        }
        return this;
    }

    addPanelContent() {
        return this;
    }
}

class PanelTitle extends RcdTextDivElement {
    init() {
        return super.init().addClass('panel-title');
    }
}

class ImageIcon extends RcdImageIcon {
    constructor(path) {
        super(config.officeLeagueAppUrl + path);
    }
}