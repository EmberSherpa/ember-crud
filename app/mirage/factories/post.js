/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage/*, {faker} */ from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title(i) {
    return `Blog post ${i+1}`;
  },
  content(i) {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nam vel facilisis lectus, et ultrices turpis. Nunc eleifend justo nec cursus
    lacinia. Vivamus nec pretium diam. Suspendisse vel turpis maximus,
    pellentesque diam quis, maximus ex. Suspendisse sodales consequat mattis.
    Etiam eget cursus enim. Fusce ${i+1} quis sodales ante. Fusce congue felis
    eros, iaculis pulvinar nisi maximus a. Nunc finibus dui interdum vehicula
    sollicitudin. Fusce vehicula tellus vitae ullamcorper pretium. Vestibulum a
    tellus aliquam, iaculis lorem quis, lobortis sem. Phasellus eu cursus nunc.
    Mauris gravida sed sapien eu dapibus. Praesent ${i+1} et enim sit amet mauris
    ullamcorper finibus eget eget magna. Morbi leo turpis, ultricies sit amet
    dictum at, pharetra vel est.`;
  }
});
