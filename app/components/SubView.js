import templateSubView from '../templates/SubView.jst';

export default Marionette.View.extend({
    template: templateSubView,
    ui: {
        save: '.save-button',
        close: '.close-button'
    },
    events: {
        'click @ui.save': 'handleSave',
        'click @ui.close': 'handleClose'
    },
    
    handleSave() {
        const saveButton = this.getUI('save');

        saveButton.addClass('disabled');
        saveButton.attr('disabled', 'disabled');
        console.log('save');
    },

    handleClose() {
        const saveButton = this.getUI('save');

        saveButton.removeClass('disabled');
        saveButton.removeAttr('disabled');
        console.log('close');
    }
});