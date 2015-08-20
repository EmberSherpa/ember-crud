import Ember from 'ember';

const {
  A,
  observer
} = Ember;

export default Ember.Helper.extend({
  // TODO(Ember 2.0): replace this in favour of `{{array-contains (get array '[]’) category.id}}`
  arrayLengthObserver: observer('_array.[]', function(){
    this.recompute();
  }),
  compute(params) {
    const [array, object] = params;
    if (!array) {
      return;
    }
    if (array !== this.get('_array')) {
      this.set('_array', A(array));
      return;
    }
    return array.contains(object);
  }
});
