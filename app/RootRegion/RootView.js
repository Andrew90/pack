import template from './RootView.jst';
import LayoutView from '../Table/LayoutView';
import blocks from '../models/blocks'
import FooterView from '../Footer/FooterView';
import DialogView from '../Dialog/DialogView';

export default Marionette.View.extend({
    template: template,
    regions: {
        headerRegion: '#header-region',
        mainRegion: '#main-region',
        footerRegon: '#footer-region',
        dialogRegion: "#dialog-region"
    },
    onRender() {
        let collection = new Backbone.Collection(blocks.posts);
        this.showChildView('mainRegion', new LayoutView({
            collection: collection
        }));
        this.showChildView('footerRegon', new FooterView());
    }
});