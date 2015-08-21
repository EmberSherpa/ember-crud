import Ember from 'ember';
import ajax from 'ic-ajax';

const { dasherize } = Ember.String;

export default Ember.Controller.extend({
  actions: {
    save(post) {
      const { title } = post;
      post.slug = dasherize(title);
      return ajax({
        url: '/api/posts',
        type: 'POST',
        data: JSON.stringify({ post: post })
      }).then(()=>{
          this.transitionToRoute('posts');
        }, (/* errors */)=>{
          // errors
        });
    }
  }
});
