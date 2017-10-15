class Panel extends RcdDivElement {
    constructor(title) {
        super();
        this.title = title && new PanelTitle(title);
    }

    init() {
        super.init().addClass('panel');
        if (this.title) {
            this.addChild(this.title);
        }
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