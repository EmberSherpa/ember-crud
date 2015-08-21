import Ember from 'ember';
import settings from 'ember-crud/settings';
import isEqual from 'ember-crud/utils/is-equal';
import ComponentHooksLoggin from 'ember-crud/mixins/component-hooks-loggin';

const {
  computed,
  isEmpty,
  on
} = Ember;

export default Ember.Component.extend(ComponentHooksLoggin, {
  tagName: 'div',
  isLoading: false,
  blogCategories: settings.categories,
  initialize: on('init', function(){
    this.setProperties({
      title: '',
      content: '',
      categories: []
    });
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    this.copyPost();
  },
  copyPost() {
    const post = this.get('post');
    if (post) {
      let { title, content, categories } = post;
      categories = categories || [];
      this.setProperties({
        title,
        content,
        categories: categories.slice()
      });
    }
  },
  postData: computed(
    'post.id',
    'title',
    'content',
    'categories.[]', {
      get() {
        let data = this.getProperties(['title', 'content', 'categories']);
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
    'post.content',
    'categories.[]',
    'post.categories', {
    get() {
      return  this.get('post.title') === this.get('title') &&
              this.get('post.content') === this.get('content') &&
              isEqual(this.get('categories'), this.get('post.categories'));
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
      this.copyPost();
    },
    updateTitle(value) {
      this.set('title', value);
    },
    updateContent(value) {
      this.set('content', value);
    },
    updateCategories(value) {
      let categories = this.get('categories');
      if (categories.contains(value)) {
        categories.removeObject(value);
      } else {
        categories.pushObject(value);
      }
    }
  }
});
