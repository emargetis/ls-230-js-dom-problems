const tracker = (() => {
    const events = [];
    
    return {
      add(event) {
        events.push(event);
      },
      
      list: function () {
        return events.slice();
      },
      
      elements: function () {
        return events.map(event => {
          return event.target;
        });
      },
      
      clear: function() {
        this.events.splice(0, this.events.length);
        return events.length;
      },
      
      isNewEvent: function(newEvent) {
        return events.filter(event => {
          return event === newEvent;
        }).length === 0;
      },
    };
})();

function track(callback) {
  return function() {
    if (tracker.isNewEvent(event)) {
      tracker.add(event);
    }
    
    callback(event);
  };
}

const divRed = document.querySelector('#red');
const divBlue = document.querySelector('#blue');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));