import { helper } from '@ember/component/helper';

function equals([item1, item2]) {
  return item1 === item2;
}

export default helper(equals);
