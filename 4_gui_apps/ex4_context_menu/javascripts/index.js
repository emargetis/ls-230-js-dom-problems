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
    document.body.addEventListener('contextmenu', (e) => this.renderContextMenu(e));
  }
  
  clickHandler(e) {
    if (e.target.classList.contains('delete')) {
      this.renderConfirmationModal(e);
      this.removeContextMenu();
    } else if (e.target.classList.contains('confirm_yes')) {
      this.deleteTodo();
      this.removeConfirmationModal();
    } else if (e.target.classList.contains('confirm_no')) {
      this.removeConfirmationModal();
    } else {
      this.removeContextMenu();
    }
  }
  
  compileTemplates() {
    let templateScript = document.querySelector('#todoListTemplate');
    this.itemTemplate = Handlebars.compile(templateScript.innerHTML);
    Handlebars.registerPartial('todo', document.querySelector('#todoTemplate').innerHTML);
    
    let confirmScript = document.querySelector('#confirmTemplate');
    this.confirmTemplate = Handlebars.compile(confirmScript.innerHTML);
    
    let contextMenuScript = document.querySelector('#contextMenuTemplate');
    this.contextMenuTemplate = Handlebars.compile(contextMenuScript.innerHTML);
  }
  
  renderInitialTodos() {
    let todoList = document.querySelector('#todoList');
    todoList.innerHTML = this.itemTemplate({ todoItems: this.todoItems });
  }
  
  renderConfirmationModal(e) {
    let confirm = document.querySelector('.confirm_prompt');

    confirm.innerHTML = this.confirmTemplate({ id: document.querySelector('.contextMenuWrapper').getAttribute("data-id")});
    confirm.style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
  }
  
  removeConfirmationModal() {
    document.querySelector('.confirmWrapper').remove();
    document.querySelector('.confirm_prompt').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
  }
  
  deleteTodo() {
    let id = document.querySelector('.confirmWrapper').getAttribute("data-id");
    document.querySelector(`[data-id="${id}"`).remove();
  }
  
  renderContextMenu(e) {
    if (e.target.tagName === 'LI') {
      e.preventDefault()
      let xCoordinate = e.pageX;
      let yCoordinate = e.pageY;
      let contextMenu = document.querySelector('.context_menu');
      contextMenu.innerHTML = this.contextMenuTemplate({ id: e.target.getAttribute("data-id")});
      contextMenu.style.display = "block";
      contextMenu.style.left = xCoordinate + 'px';
      contextMenu.style.top = yCoordinate + 'px';
    }
  }
  
  removeContextMenu() {
    if (document.querySelector('.contextMenuWrapper')) {
      document.querySelector('.contextMenuWrapper').remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new todoList());