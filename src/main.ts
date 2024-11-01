// Import the CSS file
import './style.css';

// Define the Todo interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Initialize an empty array to store todos
export let todos: Todo[] = [];

// Get references to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

// Function to add a new todo
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  renderTodos();
};

// Function to render the list of todos
const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Add checkbox for completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    // Todo text element with line-through if completed
    const span = document.createElement('span');
    span.style.textDecoration = todo.completed ? 'line-through' : 'none';
    span.textContent = todo.text;

    // Create Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeTodo(todo.id));

    // Create Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTodo(todo.id));

    li.appendChild(checkbox); // Add checkbox
    li.appendChild(span);     // Add text
    li.appendChild(removeButton);
    li.appendChild(editButton);

    todoList.appendChild(li);
  });
};

// Initial render
renderTodos();

// Event listener for the form submission
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text);
    todoInput.value = '';
  } else {
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

// Function to remove a todo by ID
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

// Function to edit a todo by ID
const editTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const text = prompt('Edit todo', todo.text);
    if (text) {
      todo.text = text;
      renderTodos();
    }
  }
};



// Function to toggle the completed status of a todo
const toggleTodo = (id: number): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

// Function to clear all completed todos
const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
};

// Create and add the Clear Completed button to the container
const clearCompletedButton = document.createElement('button');
clearCompletedButton.textContent = 'Clear Completed';
clearCompletedButton.id = 'clear-completed';
clearCompletedButton.addEventListener('click', clearCompletedTodos);

// Append the button to the container
const container = document.querySelector('.container');
if (container) {
  container.appendChild(clearCompletedButton);
}



// Color picker functionality
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

// Call the initializeColorPicker function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});
