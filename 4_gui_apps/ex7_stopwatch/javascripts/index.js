document.addEventListener('DOMContentLoaded', () => {
  
  let stopWatch = {
    currentCentiseconds: 0,
    currentSeconds: 0,
    currentMinutes: 0,
    currentHours: 0,
    
    init: function() {
      this.bind()
    },
    
    bind: function() {
      this.startButton = document.querySelector('#start');
      this.resetButton = document.querySelector('#reset');
      this.centisecondsElement = document.querySelector('#centiseconds');
      this.secondsElement = document.querySelector('#seconds');
      this.minutesElement = document.querySelector('#minutes');
      this.hoursElement = document.querySelector('#hours');

      this.startButton.addEventListener('click', (e) => this.startClickHandler(e));
      this.resetButton.addEventListener('click', (e) => this.resetTimer(e));
    },
    
    startClickHandler: function(e) {
      if (e.target.textContent === "Stop") {
        this.pauseTimer();
      } else {
        this.startTimer();
      }
    },
    
    startTimer: function() {
      this.totalCentiseconds = this.calculateCurrentCentiseconds();
      
      this.startButton.textContent = 'Stop';
      
      this.startId = setInterval(this.addTime.bind(this), 10);
    },
    
    addTime: function() {
      this.totalCentiseconds += 1;
      let sentisecondsDisplayTotal = this.totalCentiseconds;
      this.currentHours = Math.floor(sentisecondsDisplayTotal / (60 * 60 * 100));
      sentisecondsDisplayTotal -= this.currentHours * (60 * 60 * 100);
      this.currentMinutes = Math.floor(sentisecondsDisplayTotal / (60 * 100));
      sentisecondsDisplayTotal -= this.currentMinutes * (60 * 100);        
      this.currentSeconds = Math.floor(sentisecondsDisplayTotal / (100));
      sentisecondsDisplayTotal -= this.currentSeconds * (100);
      this.currentCentiseconds = sentisecondsDisplayTotal;
      this.renderCurrentTime();
    },
    
    renderCurrentTime: function() {
      this.centisecondsElement.textContent = String(this.currentCentiseconds).padStart(2, "0");
      this.secondsElement.textContent = String(this.currentSeconds).padStart(2, "0");
      this.minutesElement.textContent = String(this.currentMinutes).padStart(2, "0");
      this.hoursElement.textContent = String(this.currentHours).padStart(2, "0");
    },
    
    calculateCurrentCentiseconds: function() {
      let total = 0; 
      total += (this.currentHours * 60 * 60 * 100);
      total += (this.currentMinutes * 60 * 100);
      total += (this.currentSeconds * 100);
      total += (this.currentCentiseconds);

      return total;
    },
    
    pauseTimer: function() {
      this.startButton.textContent = 'Start';
      clearInterval(this.startId);
    },
    
    resetTimer: function() {
      this.pauseTimer();
      this.centisecondsElement.textContent = String(0).padStart(2, "0");
      this.secondsElement.textContent = String(0).padStart(2, "0");
      this.minutesElement.textContent = String(0).padStart(2, "0");
      this.hoursElement.textContent = String(0).padStart(2, "0");
    }
    
  }
  
  stopWatch.init();
})