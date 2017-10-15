class StandaloneItem extends RcdDivElement {
    constructor(params) {
        super();
        if (params.image) {
            this.image = new ImageIcon(params.image)
                .addClass('standalone-item-image')
                .init();
        }
        if (params.text) {
            this.text = new RcdTextDivElement(params.text)
                .addClass('row-text')
                .init();
        }
        this.callback = params.callback;
    }

    init() {
        super.init()
            .addClass('standalone-item')
            .addChild(this.image)
            .addChild(this.text);

        if (this.callback) {
            this.addClass('rcd-clickable')
                .addClickListener(this.callback)
        }
        return this;

    }
}