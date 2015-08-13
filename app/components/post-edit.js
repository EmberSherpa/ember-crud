import Ember from 'ember';

const { computed, isEmpty } = Ember;

export default Ember.Component.extend({
  tagName: '',
  title: '',
  content: '',
  isLoading: false,
  post: computed('title', 'content', {
    get() {
      return this.getProperties(['title', 'content']);
    }
  }),
  isValid: computed('title', {
    get() {
      return !isEmpty(this.get('title'));
    }
  }),
  isUnchanged: computed('title', 'content', {
    get() {
      const title = this.get('title');
      const content = this.get('content');
      return isEmpty(title) && isEmpty(content);
    }
  }),
  actions: {
    save() {
      const post = this.get('post');
      this.set('isLoading', true);
      this.attrs['on-save'](post)
        .catch((errors)=>{
          this.set('errors', errors);
        })
        .finally(()=>{
          this.set('isLoading', false);
        });
    },
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
