import Marionette from 'backbone.marionette';

export default Marionette.AppRouter.extend({
    routes: {
        '': 'init',
        'email/:email': 'showEmail'
    },
    init: function () {
        console.log('init');
    },
    showEmail: function (email) {
        console.log(`showEmail   ${email}`);
    }
})