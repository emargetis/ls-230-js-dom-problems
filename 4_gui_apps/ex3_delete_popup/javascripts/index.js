class todoList {
  constructor() {  
    this.todoItems = [
      { id: 1, title: 'Homework' },
      { id: 2, title: 'Shopping' },
      { id: 3, title: 'Calling Mom' },
      { id: 4, title: 'Coffee with John'}
    ];
    
    this.compileTemplates();
    this.renderInitialTodos();
    this.bind();
  }
  
  bind() {
    document.body.addEventListener('click', (e) => this.clickHandler(e))
  }
  
  clickHandler(e) {
    if (e.target.classList.contains('remove')) {
      this.renderConfirmationModal(e);
    } else if (e.target.classList.contains('confirm_yes')) {
      this.deleteTodo();
      this.removeConfirmationModal();
    } else if (e.target.classList.contains('confirm_no')) {
      this.removeConfirmationModal();
    }
  }
  
  compileTemplates() {
    let templateScript = document.querySelector('#todoListTemplate');
    this.itemTemplate = Handlebars.compile(templateScript.innerHTML);
    Handlebars.registerPartial('todo', document.querySelector('#todoTemplate').innerHTML);
    
    let confirmScript = document.querySelector('#confirmTemplate');
    this.confirmTemplate = Handlebars.compile(confirmScript.innerHTML);
  }
  
  renderInitialTodos() {
    let todoList = document.querySelector('#todoList');
    todoList.innerHTML = this.itemTemplate({ todoItems: this.todoItems });
  }
  
  renderConfirmationModal(e) {
    let confirm = document.querySelector('.confirm_prompt');

    confirm.innerHTML = this.confirmTemplate({ id: e.target.parentElement.getAttribute("data-id")});
    confirm.style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
  }
  
  removeConfirmationModal() {
    document.querySelector('.confirm_wrapper').remove();
    document.querySelector('.confirm_prompt').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
  }
  
  deleteTodo() {
    let id = document.querySelector('.confirm_wrapper').getAttribute("data-id");
    document.querySelector(`[data-id="${id}"`).remove();
  }
}

document.addEventListener('DOMContentLoaded', () => new todoList());