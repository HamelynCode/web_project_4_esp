export default class Section {
    constructor({items, renderer}, containerSelector){
        this._items = items;
        this._renderer = renderer;
    }

    render() {
        this._items.forEach((item)=>{
            this._renderer(item);
        });
    }

    addItem(item) {
        this._renderer(item);
    }
}