import template from './DialogView.jst';

export default Marionette.View.extend({
    template: template,      
    ui: {
        save: '.save-button',
        close: '.close'
    },
    events: {
        'click @ui.save': 'handleSave',
        'click @ui.close': 'handleClose'
    },

    handleSave() {

    },

    handleClose() {        
         this.$el.hide();      
    }
});
