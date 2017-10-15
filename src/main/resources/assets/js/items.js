class ResultItem extends RcdDivElement {
    constructor(params) {
        super();
        if (params.image) {
            this.image = new ImageIcon(params.image)
                .addClass('result-item-image')
                .init();
        }
        if (params.text) {
            this.text = new RcdTextDivElement(params.text)
                .addClass('result-item-text')
                .init();
        }
        this.callback = params.callback;
    }

    init() {
        super.init()
            .addClass('result-item')
            .addChild(this.image)
            .addChild(this.text);

        if (this.callback) {
            this.addClass('rcd-clickable')
                .addClickListener(this.callback)
        }
        return this;
    }
}