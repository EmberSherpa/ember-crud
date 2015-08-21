export default function fillIn($el, text) {
  $el.val(text);
  $el.trigger('input');
  $el.change();
}
