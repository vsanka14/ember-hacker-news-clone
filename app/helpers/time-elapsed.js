import { helper } from '@ember/component/helper';

function timeElapsed([timestamp]) {
  if (typeof timestamp !== 'number') return;

  const timestampInMs = timestamp * 1000;
  const delta = (Date.now() - timestampInMs) / 1000;
  const hours = Math.floor(delta / 3600);
  const minutes = Math.floor((delta % 3600) / 60);
  const seconds = Math.floor((delta % 3600) % 60);
  const days = Math.floor(hours / 24);

  if (days) {
    return `${days} ${days > 1 ? 'days' : 'day'}`;
  }

  if (hours) {
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  }

  if (minutes) {
    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
  }

  if (seconds) {
    return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
  }
}

export default helper(timeElapsed);
