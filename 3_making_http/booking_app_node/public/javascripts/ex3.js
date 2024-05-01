document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    
    let data = new FormData(form);
    let request = new XMLHttpRequest();
    
    request.open('POST', '/api/staff_members');
    
    request.addEventListener('load', () => {
      let status = request.status;
      
      if (status === 201) {
        const data = JSON.parse(request.response);
        alert(`Successfully created staff with id: ${data.id}`);
      } else if (status === 400) {
        alert(request.responseText);
      }
      
    });
    
    request.send(data);
  });
})