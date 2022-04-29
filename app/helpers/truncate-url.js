import { helper } from '@ember/component/helper';

function truncateUrl([url]) {
  if (typeof url !== 'string') return;

  let domainName;

  try {
    const { hostname } = new URL(url);
    const hostnameArr = hostname.split('.');
    const isLeadingWithWWW = hostnameArr[0] === 'www';
    if (isLeadingWithWWW) {
      domainName = hostnameArr.slice(1).join('.');
    } else {
      domainName = hostnameArr.join('.');
    }
  } catch (err) {
    console.error(`Could not construct url for ${url}`, err);
  }

  return domainName;
}

export default helper(truncateUrl);
