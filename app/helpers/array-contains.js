import Ember from 'ember';

const {
  A
} = Ember;

export function arrayContains(params/*, hash*/) {
  const [array, object] = params;
  return A(array).contains(object);
}

export default Ember.Helper.helper(arrayContains);
