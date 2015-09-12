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
      }).then((result)=>{
          this.transitionToRoute('posts.show', result.post.slug);
        }, (/* errors */)=>{
          // errors
        });
    }
  }
});
// END-SNIPPET
