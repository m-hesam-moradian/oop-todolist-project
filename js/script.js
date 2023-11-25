class Todo {
  constructor(title) {
    this.title = title;
    this.isComplete = false;
  }
}

class todosList {
  constructor() {
    this.container = document.querySelector("#todoList");
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.addButton = document.querySelector("#addButton");
    this.clearButton = document.querySelector("#clearButton");
    this.itemInput = document.querySelector("#itemInput");

    //metohds
    this.render();
  }
  //////////////methods/////////////

  //////////////render/////////////
  render() {
    // console.log(completeButton);
    this.todogeter();
    // this.addButtonRunner();
    // this.clearButtonRunner();
    this.localStorageReader();
    this.clearTodoList();
  }
  //////////////////local storage adder/////////////
  localStorageAdder() {
    this.todos.push(new Todo(this.itemInput.value));

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  //////////////////local storage reader to dom/////////////

  localStorageReader() {
    this.container.innerHTML = "";
    this.todos.forEach((obj) => {
      if (obj.isComplete) {
        this.container.insertAdjacentHTML(
          "beforeend",
          `<li class="completed well">
        <label class="blackColor completed">${obj.title}</label>
        <button  id="completeButton" class="btn btn-success" onclick="todolist1.completeButtonF(event)" >Complete</button>
        <button id="removeButton" class="btn btn-danger" onclick="todolist1.removeButtonF(event)" >Remove</button>
        </li>`
        );
      } else {
        this.container.insertAdjacentHTML(
          "beforeend",
          `<li class="completed well">
        <label class="blackColor">${obj.title}</label>
        <button  id="completeButton" class="btn btn-success" onclick="todolist1.completeButtonF(event)" >Complete</button>
        <button id="removeButton" class="btn btn-danger" onclick="todolist1.removeButtonF(event)" >Remove</button>
        </li>`
        );
      }
    });
  }
  //////////////////todo adder////////////
  todogeter() {
    this.addtodobutton();
    this.addtodoEnter();
  }
  addtodobutton() {
    this.addButton.addEventListener("click", (event) => {
      this.localStorageAdder();
      this.localStorageReader();
      this.itemInput.value = "";
    });
  }
  addtodoEnter() {
    this.itemInput.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        this.localStorageAdder();
        this.localStorageReader();
        this.itemInput.value = "";
      }
    });
  }
  ////////////////clear todo list ///////////////
  clearTodoList() {
    this.clearButton.addEventListener("click", (event) => {
      this.todos = [];
      localStorage.clear();
      this.localStorageReader();
    });
  }
  /////////local storage update from todos array/////////////
  localStorageUpdate(array) {
    localStorage.clear();

    localStorage.setItem("todos", JSON.stringify(array));
  }
  /////////////////complete Button runner/////////////////
  completeButtonF(event) {
    event.target.previousElementSibling.classList.toggle("completed");

    this.todos.forEach((obj) => {
      if (obj.title == event.target.previousElementSibling.innerHTML) {
        if (obj.isComplete) {
          obj.isComplete = false;
        } else {
          obj.isComplete = true;
        }

        this.localStorageUpdate(this.todos);
      }
    });
  }
  /////////////////remove Button runner/////////////////
  removeButtonF(event) {
    const button = event.target;
    
    this.todos = this.todos.filter(
      (item) =>
        item.title !==
        button.previousElementSibling.previousElementSibling.innerHTML
    );

    this.localStorageUpdate(this.todos);

    const parent = button.parentNode;
    parent.parentNode.removeChild(parent);
  }
}




let todolist1 = new todosList();
