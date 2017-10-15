class Panel extends RcdDivElement {
    constructor(title) {
        super();
        this.title = new PanelTitle(title);
    }

    init() {
        return super.init().addClass('panel');
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