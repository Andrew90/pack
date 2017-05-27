import RootView from '../RootRegion/RootView';
import Router from './Router';

 const App = Marionette.Application.extend({
  region : 'body',
  initialize: function(options) {
    console.log('initialize');
  },
  onBeforeStart() {
    console.log("onBeforeStart");
  },
  onStart(options) {
    console.log("onStart");
    var router = new Router(options);
    Backbone.history.start();
    this.showView(new RootView());
  }
});

export default new App();



