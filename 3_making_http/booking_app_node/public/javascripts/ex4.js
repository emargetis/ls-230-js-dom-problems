/*
1. Populate the dropdown:
  - send a get request to the /api/staff_members api
  - add the elements to the dropdown using a loop
2. Make add more button work:
  - duplicate the form elements
  
3. Get values to submit from form

4. Submit and handle responses accordingly
  - alert for errors (responses other than 201)
  - 
  
*/

document.addEventListener('DOMContentLoaded', () => {
  let scheduleIndex = 1;
  
  //Populate staff
  function populateStaffDropdown() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/staff_members');
    xhr.responseType = 'json';
    let staffMembers;
    
    xhr.addEventListener('load', () => {
      let staffMembers = xhr.response;
      let staffNameDropdown = document.querySelector('.staff-name');
      
      staffMembers.forEach(member => {
        let option = document.createElement('option');
        option.setAttribute('value', member.id);
        option.textContent = member.name;
        
        staffNameDropdown.appendChild(option);
      });
      
    });
    
    xhr.send();
    
    return staffMembers;
  }
  
  populateStaffDropdown();
  
  
  //add additional schedules
  let addMoreButton = document.querySelector('#add-more');
  let submitButton = document.querySelector('input[type="submit"]');
  let form = document.querySelector('form');
  
  addMoreButton.addEventListener('click', () => {
    let scheduleFieldSet = document.querySelector('.schedule');
    let scheduleClone = scheduleFieldSet.cloneNode(true);
    
    //Replace schedule #
    scheduleIndex += 1;
    let legend = scheduleClone.querySelector('legend');
    legend.textContent = legend.textContent.replace(/[0-9]+/g, scheduleIndex);

    form.insertBefore(scheduleClone, submitButton);
    
  });
  
  //Gather form data into JSON format
  function gatherScheduleData() {
    let schedules = document.querySelectorAll('.schedule');
    
    return [...schedules].map(schedule => {
      let scheduleData = {};
      
      scheduleData.staff_id = schedule.querySelector('.staff-name').value;
      scheduleData.date = schedule.querySelector('.date').value;
      scheduleData.time = schedule.querySelector('.time').value;
      
      return scheduleData;
    });
  }
  
  
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/schedules');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let scheduleData = {schedules: gatherScheduleData()};
    let json = JSON.stringify(scheduleData);

    xhr.addEventListener('load', () => {
      alert(xhr.responseText);
      
      if (xhr.status === 201) form.reset();
    });
    
    xhr.send(json);

  });
})