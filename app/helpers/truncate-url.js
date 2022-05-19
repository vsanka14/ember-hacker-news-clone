import { helper } from '@ember/component/helper';

function truncateUrl([url]) {
  if (typeof url !== 'string') return;

  let regExp = /([\w-]+\.)+\w+/g;
  let domainName = url.match(regExp);
  if (!domainName) return;

  const domainNameArr = domainName[0].split('.');
  if (domainNameArr[0] === 'www') {
    domainName = domainNameArr.slice(1).join('.');
  }
  return domainName;
}

export default helper(truncateUrl);
