import { helper } from '@ember/component/helper';

function toDateString([timestamp]) {
  if (typeof timestamp !== 'number') return;

  const timestampInMs = timestamp * 1000;
  const date = new Date(timestampInMs);
  const [, month, day, year] = date.toDateString().split(' ');
  return `${month} ${day}, ${year}`;
}

export default helper(toDateString);
