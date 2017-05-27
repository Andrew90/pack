import template from './FooterView.jst';

export default Marionette.View.extend({
    template: template,
    ui: {
        open: '.open-button',
    },
    events: {
        'click @ui.open': 'handleOpen'
    },

    handleOpen() {
        console.log('Open btn');
    }
});
