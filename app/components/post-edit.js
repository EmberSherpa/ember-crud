import Ember from 'ember';

const {computed} = Ember;

export default Ember.Component.extend({
  tagName: '',
  title: '',
  content: '',
  isLoading: false,
  post: computed('title', 'content', function(){
      return this.getProperties(['title', 'content']);
    }
  ),
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
