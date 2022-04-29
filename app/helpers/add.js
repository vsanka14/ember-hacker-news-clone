import { helper } from '@ember/component/helper';

function add([num1, num2]) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') return;

  return num1 + num2;
}

export default helper(add);
