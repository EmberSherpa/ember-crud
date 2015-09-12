// BEGIN-SNIPPET controllers.posts.show
import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    save(post) {
      return ajax({
        url: `/api/posts/${post.id}`,
        type: 'PUT',
        data: JSON.stringify({ post: post })
      }).then(()=>{
          this.transitionToRoute('posts');
        }, (/* errors */)=>{
          // errors
        });
    }
  }
});
// END-SNIPPET
