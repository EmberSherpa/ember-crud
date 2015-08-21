import Ember from 'ember';

const { isEmpty } = Ember;

export function postExcerpt(params/*, hash*/) {
  let [ content ] = params;
  content = content || '';
  let sentences = content.match( /[^\.!\?]+[\.!\?]+/g );
  return !isEmpty(sentences) ? sentences.slice(0, 2).join(' ') : '';
}

export default Ember.Helper.helper(postExcerpt);
