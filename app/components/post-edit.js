import Ember from 'ember';

const {computed} = Ember;

export default Ember.Component.extend({
  tagName: '',
  title: '',
  content: '',
  post: computed('title', 'content', function(){
      return this.getProperties(['title', 'content']);
    }
  ),
  actions: {
    discard() {
      this.setProperties({
        title: '',
        content: ''
      });
    },
    updateTitle(value) {
      this.set('title', value);
    },
    updateContent(value) {
      this.set('content', value);
    }
  }
});
