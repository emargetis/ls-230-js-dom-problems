document.addEventListener('DOMContentLoaded', () => {
  
  async function fetchDates() {
    const response = await fetch('/api/bookings');
    const dates = await response.json();
    return dates;
  }
  
  async function fetchBookingsByDate(datesArr) {
    // //Fetch each date in parallel
    // let bookingsResponses = await Promise.all(datesArr.map(date => {
    //     return fetch(`/api/bookings/${date}`);
    // }));
    
    //Fetch each date one at at time
    for (let date of datesArr) {
        const response = await fetch(`/api/bookings/${date}`);
        const bookings = await response.json();
        addBookingsToDom(date, bookings);
    }
  }
  
  function addBookingsToDom(date, bookings) {
    let datesDiv = document.querySelector('.dates-div');
    
    let outerList = document.createElement("ul");
    outerList.classList.add("outer-list");
    
    let dateItem = document.createElement('li');
    dateItem.classList.add("date");
    dateItem.textContent = date;
    outerList.appendChild(dateItem);
    
    let subList = document.createElement("ul");
    subList.classList.add("sub-list");
    
    bookings.forEach(booking => {
      let bookingItem = document.createElement('li');
      bookingItem.classList.add("booking");
      bookingItem.textContent = `${booking[0]} | ${booking[1]} | ${booking[2]}`;

      subList.appendChild(bookingItem);
    })
    
    outerList.appendChild(subList);
    datesDiv.appendChild(outerList);
  }
  
  (async () => {
    fetchBookingsByDate(await fetchDates());
  })();
  
  //Add event listener for date clicks
  let datesDiv = document.querySelector('.dates-div');
  datesDiv.addEventListener('click', (event) => {
    let clickedTarget = event.target;
    
    if (clickedTarget.classList.contains('date')) {
      let subList = clickedTarget.parentNode.querySelector('.sub-list');
      subList.style.display = 'block';
    }
  });
})