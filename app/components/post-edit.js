import Ember from 'ember';
import settings from 'ember-crud/settings';
import isEqual from 'ember-crud/utils/is-equal';
import Hooks from 'ember-hooks';

const {
  computed,
  isEmpty,
  getProperties,
  get
} = Ember;

export default Ember.Component.extend(Hooks, {
  isLoading: false,
  blogCategories: settings.categories,
  init() {
    this.setProperties({
      title: '',
      content: '',
      categories: []
    });
    this._super(...arguments);
  },
  didReceiveAttrs() {
    this.copyPost();
  },
  copyPost() {
    const post = this.get('post');
    if (post) {
      const values = getProperties(post, 'title', 'content');
      const categories = get(post, 'categories') || [];
      this.setProperties(values);
      this.set('categories', categories.slice());
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
