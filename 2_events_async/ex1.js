function randomizer(...callbacks) {
  let totalSeconds = callbacks.length * 2;
  let callbackSeconds = callbacks.map(callback => Math.ceil(Math.random() * totalSeconds));
  let second = 1;

  while (second <= totalSeconds) {
    let currSec = second;
    setTimeout(() => {
      console.log(currSec)
    }, second * 1000);
    
    second += 1;
  }
  
  callbacks.forEach((callback, idx) => {
    setTimeout(() => callback(), callbackSeconds[idx] * 1000);
  })
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6


//Launch School Solution
function randomizer(...callbacks) {
  if (callbacks.length < 1) {
    return;
  }

  const secondsEnd = 2 * callbacks.length;
  let secondsElapsed = 0;

  const timeLogger = setInterval(() => {
    secondsElapsed += 1;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timeLogger);
    }
  }, 1000);

  callbacks.forEach(callback => {
    const executeTime = Math.floor(Math.random() * secondsEnd * 1000);
    setTimeout(callback, executeTime);
  });
}