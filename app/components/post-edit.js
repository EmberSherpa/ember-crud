import Ember from 'ember';
import settings from 'ember-crud/settings';
import difference from 'lodash/array/difference';

const { computed, isEmpty } = Ember;

export default Ember.Component.extend({
  tagName: '',
  isLoading: false,
  blogCategories: settings.categories,
  didReceiveAttrs(attrs) {
    const { post } = attrs.newAttrs;
    let title = '';
    let content = '';
    let categories = [];
    if (post) {
      title = post.value.title;
      content = post.value.content;
      categories = post.value.categories;
    }
    this.setProperties({
      title: title,
      content: content,
      categories: []
    });
  },
  postData: computed(
    'post.id',
    'title',
    'content', {
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
    'categories',
    'post.categories', {
    get() {
      const categories = this.get('categories');
      const originalCategories = this.get('post.categories');
      const diff = difference(categories, originalCategories);
      const isCategoriesUnchanged = diff.length === 0;
      return  this.get('post.title') === this.get('title') &&
              this.get('post.content') === this.get('content') &&
              isCategoriesUnchanged;
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
    },
    updateCategories(value) {
      let categories = this.get('categories');
      const index = categories.indexOf(value);
      if ( index === -1 ) {
        categories.push(value);
      } else {
        categories.splice(index, 1);
      }
      this.set('categories', categories);
    }
  }
});
