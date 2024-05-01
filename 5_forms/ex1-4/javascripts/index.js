document.addEventListener('DOMContentLoaded', () => {
  //First name field
  let firstName = document.querySelector('#firstName');
  let firstNameError = document.querySelector('#firstNameField .error');
  
  firstName.addEventListener('blur', () => {
    if (!firstName.checkValidity()) {
      firstNameError.textContent = "Please enter a first name";
      firstName.classList.add("invalid");
    } else {
      firstNameError.textContent = "";
      firstName.classList.remove("invalid");
      if (form.checkValidity()) {
        formError.textContent = "";
      }
    }
  });

  firstName.addEventListener('focus', () => {
    firstNameError.textContent = "";
    firstName.classList.remove("invalid");
  });
  
  firstName.addEventListener('keydown', (e) => {
    if (!(e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'z')) {
      e.preventDefault();
    }
  });

  //Last name field
  let lastName = document.querySelector('#lastName');
  let lastNameError = document.querySelector('#lastNameField .error');
  
  lastName.addEventListener('blur', () => {
    if (!lastName.checkValidity()) {
      lastNameError.textContent = "Please enter a last name";
      lastName.classList.add("invalid");
    } else {
      lastNameError.textContent = "";
      lastName.classList.remove("invalid");
      if (form.checkValidity()) {
        formError.textContent = "";
      }
    }
  });
  
  lastName.addEventListener('focus', () => {
    lastNameError.textContent = "";
    lastName.classList.remove("invalid");
  });
  
  lastName.addEventListener('keydown', (e) => {
    if (!(e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'z')) {
      e.preventDefault();
    }
  });

  //Email field
  let email = document.querySelector('#email');
  let emailError = document.querySelector('#emailField .error');
  
  email.addEventListener('blur', () => {
    if (!email.checkValidity()) {
      emailError.textContent = "Please enter a valid email address";
      email.classList.add("invalid");
    } else {
      emailError.textContent = "";
      email.classList.remove("invalid");
      if (form.checkValidity()) {
        formError.textContent = "";
      }
    }
  });
  
  email.addEventListener('focus', () => {
    emailError.textContent = "";
    email.classList.remove("invalid");
  });

  //Password Field
  let password = document.querySelector('#password');
  let passwordError = document.querySelector('#passwordField .error');
  
  password.addEventListener('blur', () => {
    if (!password.checkValidity()) {
      passwordError.textContent = "Password must be at least 10 characters";
      password.classList.add("invalid");
    } else {
      passwordError.textContent = "";
      password.classList.remove("invalid");
      if (form.checkValidity()) {
        formError.textContent = "";
      }
    }
  });
  
  password.addEventListener('focus', () => {
    passwordError.textContent = "";
    password.classList.remove("invalid");
  });

  //Phone Number field
  let phone = document.querySelector('#phone');
  let phoneError = document.querySelector('#phoneField .error');
  
  phone.addEventListener('blur', () => {
    if (!phone.checkValidity()) {
      phoneError.textContent = "Phone must be in valid format";
      phone.classList.add("invalid");
    } else {
      phoneError.textContent = "";
      phone.classList.remove("invalid");
      if (form.checkValidity()) {
        formError.textContent = "";
      }
    }
  });
  
  phone.addEventListener('focus', () => {
    phoneError.textContent = "";
    phone.classList.remove("invalid");
  });
  
  phone.addEventListener('keydown', (e) => {
    if (!((e.key >= '0' && e.key <= '9') || e.key === "Backspace" || e.key === "-")) {
      e.preventDefault();
    }
  });

  //Credit Card Field
  let credit = document.querySelectorAll('[name="credit"]');
  let creditError = document.querySelector('#creditField .error');
  
  credit.forEach((field, idx) => {
    field.addEventListener('blur', () => {
      if (!field.checkValidity()) {
        creditError.textContent = "Please enter valid credit card number";
        field.classList.add("invalid");
      } else {
        creditError.textContent = "";
        field.classList.remove("invalid");
        if (form.checkValidity()) {
          formError.textContent = "";
        }
      }
    });

    field.addEventListener('focus', () => {
      phoneError.textContent = "";
      phone.classList.remove("invalid");
    });
    
    if (idx < 3) {
      field.addEventListener('keydown', (e) => {
        if (e.target.value.length >= 4 && e.key !== "Backspace") {
          e.preventDefault();
          e.target.nextElementSibling.focus();
        }
        
        if (!((e.key >= '0' && e.key <= '9') || e.key === "Backspace")) {
          e.preventDefault();
        }
      });
    } else {
      field.addEventListener('keydown', (e) => {
        if (e.target.value.length >= 4 && e.key !== "Backspace") {
          e.preventDefault();
        }
        
        if (!((e.key >= '0' && e.key <= '9') || e.key === "Backspace")) {
          e.preventDefault();
        }
      });
    }
  });

  let formError = document.querySelector('form span');
  let form = document.querySelector('form');
  
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      formError.textContent = "Form cannot be submitted until errors are corrected.";
    } else {
      e.preventDefault();
      formError.textContent = "";
      let data = new FormData(form);
      console.log(data);
      
      let ccInfo = data.getAll('credit').join('');
      data.set('credit', ccInfo);
      console.log(data)
      
      
      let formQueryString = new URLSearchParams(data).toString();
      document.querySelector('#serializedForm').textContent = formQueryString;
    }
  });
  
})