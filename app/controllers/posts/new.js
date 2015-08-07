import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    save(post) {
      const payload = { data: post };
      return ajax({
        url: '/api/posts',
        type: 'POST',
        data: JSON.stringify(payload)
      }).then(()=>{
          this.transitionToRoute('posts');
        }, (errors)=>{
          // errors
        });
    }
  }
});
