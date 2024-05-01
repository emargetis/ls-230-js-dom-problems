function cancelSchedule(scheduleId) {
  fetch(
    `/api/schedules/${scheduleId}`,
    { method: 'DELETE' },
  ).then((response) => {
      if (response.ok) {
        alert('Schedule deleted successfully');
      } else {
        response.text().then((data) => {
          alert(data);
        });
      }
  }).catch((error) => {alert(error.statusText)});
}

function cancelBooking(bookingId) {
  fetch(
    `/api/bookings/${bookingId}`,
    { method: 'PUT' },
  ).then((response) => {
      if (response.ok) {
        alert('Booking deleted successfully');
      } else {
        response.text().then((data) => {
          alert(data);
        });
      }
  }).catch((error) => {alert(error.statusText)});
}


