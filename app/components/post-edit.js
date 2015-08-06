import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    updateTitle(value) {
      this.set('title', value);
    },
    updateContent(value) {
      this.set('content', value);
    }
  }
});
