function delegateEvent(parentElement, selector, eventType, callback) {
  if (!document.contains(parentElement)) return undefined;
  let descendants = parentElement.querySelectorAll(selector);
  
  parentElement.addEventListener(eventType, event => {
      if (Array.from(descendants).includes(event.target)) {
        callback(event);
      }
  });

  return true;
}

// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};