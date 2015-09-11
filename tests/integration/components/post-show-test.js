import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-show', 'Integration | Component | post show', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(6);

  this.set('post', {
    title: 'foo',
    content: 'bar',
    slug: 'foo-bar'
  });
  this.render(hbs`{{post-show post=post preview=preview}}`);

  // show in full mode
  assert.equal(this.$('.post-title').text().trim(), 'foo', 'title is visible');
  assert.equal(this.$('.post-description').text().trim(), 'bar', 'content is visible');
  assert.ok(this.$('a:contains(read more)').length === 0, 'read more link is not visible');
  assert.ok(this.$('.post.with-full-content:visible').length === 1);

  // show in preview mode
  this.set('preview', true);
  assert.ok(this.$('.post.with-excerpt:visible').length === 1);
  assert.ok(this.$('a:contains(read more)').length === 1, 'read more link is visible');
});
