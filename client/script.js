const addButton = document.getElementById('add-todo');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fetch and display existing to-dos
async function fetchTodos() {
  const response = await fetch('http://localhost:5000/todos');
  const todos = await response.json();
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.text;
    todoItem.classList.toggle('completed', todo.completed);

    // Create a delete button for each to-do item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', async (e) => {
      e.stopPropagation(); // Prevent triggering the click event on the li
      await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: 'DELETE',
      });
      fetchTodos(); // Refresh the list
    });

    // Toggle completion on click
    todoItem.addEventListener('click', async () => {
      await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: 'PUT',
      });
      fetchTodos(); // Refresh the list
    });

    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });
}

// Add a new to-do
addButton.addEventListener('click', async () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: todoText }),
    });
    todoInput.value = '';
    fetchTodos(); // Refresh the list
  }
});

// Initial load
fetchTodos();
