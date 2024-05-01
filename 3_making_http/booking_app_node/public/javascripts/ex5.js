/*
1. Retrieve all schedules using the /api/schedules and staff names
2. Populate the dropdown
3. Submit the booking using the /api/bookings
4. If booking api returns an error, then prompt user to add the student
5. When the user adds the student, on sucess, resubmit the booking form too
*/

$(function() {
  
  function populateScheduleDropDown() {
    let schedulesAjax = $.ajax({
                                url: '/api/schedules',
                                type: 'GET',
                                dataType: 'json'
                        });
    let staffAjax = $.ajax({
                            url: '/api/staff_members',
                            type: 'GET',
                            dataType: 'json'
                    });
                    
    $.when(schedulesAjax, staffAjax).done(function(schedules, staff) {
      let schedulesData = schedules[0];
      let staffData = staff[0];
      
      //remove booked slots from list
      let schedulesDataFiltered = schedulesData.filter(schedule => {
        return !schedule.student_email;
      });
      
      $('#schedule-list').empty();
      
      schedulesDataFiltered.forEach(schedule => {
        //add staff names to filtered schedules
        staffData.forEach(staff => {
          if (schedule.staff_id === staff.id) {
            schedule.staff_name = staff.name;
          }
        })

        //add option to dropdown
        $('#schedule-list').append(`<option value=${schedule.id}>${schedule.staff_name} 
                                    | ${schedule.date} | ${schedule.time}</option>`);
      });
    });
  }
    
  populateScheduleDropDown();
  
  //turn form data into JSON
  function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }
  
  //Try to submit schedule form
  $('#schedule-form').on('submit', (e) => {
    e.preventDefault();
    let formData = getFormData($('#schedule-form'));
    
    $.ajax({
            url: '/api/bookings',
            type: 'POST',
            data: formData,
    }).done((response) => {
      //success
      alert('Booked');
      $('#schedule-form')[0].reset();
      populateScheduleDropDown();
    }).fail((response) => {
      alert(response.responseText);
      let booking_sequence = response.responseText.match(/[0-9]+/g)[0];
      //failure
      //disable old form
      $('#email').prop('disabled', 'true');
      $('#schedule-submit').prop('disabled', 'true');
      
      //Display new form
      $('.student-details').css('display', 'block');
      
      //prepopulate new form
      $('#email-new').val($('#email').val());
      $('#booking-sequence').val(booking_sequence);
    });
  });
  
  //Submit new student details if above fails
  $('#student-details-form').on('submit', (e) => {
    e.preventDefault();
    let formData = getFormData($('#student-details-form'));
    
    $.ajax({
            url: '/api/students',
            type: 'POST',
            data: formData,
    }).done((response) => {
      alert(response);

      //Change email in original form to new student email and renable submit button
      $('#email').prop('disabled', 'false');
      $('#email').val($('#email-new').val());
      $('#schedule-submit').prop('disabled', 'false');
      
      //Reset the student details form
      $('#student-details-form')[0].reset();
      $('.student-details').css('display', 'none');
      
      //submit booking
      $('#schedule-submit').trigger('submit');
      
    }).fail((response) => {
      alert(response.responseText);
    });
  });
}); 
