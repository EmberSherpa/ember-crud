import Ember from 'ember';

const { computed, isEmpty } = Ember;

export default Ember.Component.extend({
  tagName: '',
  isLoading: false,
  didReceiveAttrs(attrs) {
    const { post } = attrs.newAttrs;
    let title = '';
    let content = '';
    if (post) {
      title = post.value.title;
      content = post.value.content;
    }
    this.setProperties({
      title: title,
      content: content
    });
  },
  postData: computed(
    'post.id',
    'title',
    'content', {
      get() {
        let data = this.getProperties(['title', 'content']);
        let id = this.get('post.id');
        if (id) {
          data.id = id;
        }
        return data;
      }
  }),
  isValid: computed('title', {
    get() {
      return !isEmpty(this.get('title'));
    }
  }),
  isUnchanged: computed(
    'post.title',
    'title',
    'content',
    'post.content', {
    get() {
      return  this.get('post.title') === this.get('title') &&
              this.get('post.content') === this.get('content');
    }
  }),
  isChanged: computed.not('isUnchanged'),
  isSavable: computed.and('isChanged', 'isValid'),
  actions: {
    save() {
      const data = this.get('postData');
      this.set('isLoading', true);
      this.attrs['on-save'](data)
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
