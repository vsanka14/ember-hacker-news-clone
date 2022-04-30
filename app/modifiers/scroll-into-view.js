import { modifier } from 'ember-modifier';

function scrollIntoView(element) {
  function clickHandler({ target }) {
    if (target.tagName.toLowerCase() !== 'button') return;

    const { scrollToId } = target.dataset;
    const elToScrollTo = document.getElementById(scrollToId);
    elToScrollTo.scrollIntoView({ behavior: 'smooth' });
  }

  element.addEventListener('click', clickHandler);
}
export default modifier(scrollIntoView);
