const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');



// Load tasks from local storage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];


const generateTemplate = todo => {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <input type="checkbox" class="todo-checkbox">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
  `;

  list.innerHTML += html;
}

// Populate the list with saved tasks
savedTasks.forEach(task => {
  generateTemplate(task);
});


//Add todos
addForm.addEventListener('submit', e=>{
    e.preventDefault();
    const todo = addForm.add.value.trim();

    console.log(todo)
    if(todo.length){
      generateTemplate(todo);
      savedTasks.push(todo); // Save to local storage
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      addForm.reset();
    }
});

//delete todos
list.addEventListener('click', e =>{
  if(e.target.classList.contains('delete')){
    e.target.parentElement.remove()
  }
})

// Toggle strikethrough when checkbox is clicked
list.addEventListener('change', e => {
  if (e.target.classList.contains('todo-checkbox')) {
      const todoItem = e.target.parentElement;
      const todoText = todoItem.querySelector('span');
      todoText.classList.toggle('completed', e.target.checked);

      // Update local storage for completed tasks
      const taskIndex = savedTasks.indexOf(todoText.textContent);
      if (taskIndex !== -1) {
          savedTasks.splice(taskIndex, 1, todoText.textContent);
          localStorage.setItem('tasks', JSON.stringify(savedTasks));
      }
  }
});


//Filtered todos
const filterTodos = (term)=>{

Array.from(list.children)
  .filter((test) => !test.textContent.toLowerCase().includes(term))
  .forEach((test) => test.classList.add('filtered'));

  Array.from(list.children)
  .filter((test) => test.textContent.toLowerCase().includes(term))
  .forEach((test) => test.classList.remove('filtered'));

}

//keyup event
search.addEventListener('keyup', ()=>{
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});