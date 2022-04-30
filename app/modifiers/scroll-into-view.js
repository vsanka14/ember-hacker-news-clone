import { modifier } from 'ember-modifier';

function scrollIntoView(element, [isFocused, id]) {
  if (isFocused) {
    element.scrollIntoView();
  }
}

export default modifier(scrollIntoView);
