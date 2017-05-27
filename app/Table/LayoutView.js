import row_template from './row-template.jst';
import table from './table.jst';

const RowView = Marionette.View.extend({
  tagName: 'tr',
  template: row_template, 
  triggers: {
    "click td a.js-show": "contact:show",
    "click td a.js-edit": "contact:edit",
    "click td a.js-delete": "contact:delete"
  },
  //triggers: {
  //  'click': 'select:item'
  // }
});

const TableBody = Marionette.CollectionView.extend({
  tagName: 'tbody',
  childView: RowView,
  onChildviewContactShow(e) {
    console.log('onChildviewContactShow: ' + e.model.id);
  },
  onChildviewContactEdit(e) {
    console.log('onChildviewContactEdit: ' + e.model.id);
  },
  onChildviewContactDelete(e) {
    console.log('onChildviewContactDelete: ' + e.model.id);
  },

});

export default Marionette.View.extend({
  tagName: 'table',
  className: 'table table-hover',
  template: table,

  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },

  onRender() {
    this.showChildView('body', new TableBody({
      collection: this.collection
    }));
  }
});
