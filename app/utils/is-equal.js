import isEqual from 'lodash/lang/isEqual';

export default function _isEqual(array1 = [], array2 = []) {
  return isEqual(array1.sort(), array2.sort());
}
