import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model(params) {
    return ajax(`/api/posts/${params.slug}`).then(function(response){
      return response.post;
    });
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
      .catch((errors)=>{
        // handle errors
      });
    }
  }
});
