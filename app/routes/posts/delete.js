// BEGIN-SNIPPET routes.posts.delete
import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model(params) {
    return ajax(`/api/posts/${params.slug}`);
  },
  actions: {
    confirm(post) {
      ajax({
        url: `/api/posts/${post.id}`,
        type: 'DELETE'
      })
      .then(()=>{
        this.transitionTo('posts');
      })
      .catch((/* errors */)=>{
        // handle errors
      });
    }
  }
});
// END-SNIPPET
