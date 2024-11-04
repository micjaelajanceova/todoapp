// 1 Import the CSS file: This ensures that the styles are applied to the HTML elements.
import './style.css';

// Step 2: Define the Todo interface
// Define the Todo interface: This interface defines the structure of a todo item.
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Step 3: Initialize an empty array to store todos
// Initialize an empty array: This array will store the list of todos.
export let todos: Todo[] = [];

// Step 4: Get references to the HTML elements
// Get references to the HTML elements: These references will be used to interact with the DOM
const todoInput = document.getElementById('todo-input') as HTMLInputElement; // exist in HTML file
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;    // exist in HTML file
const todoList = document.getElementById('todo-list') as HTMLUListElement;   // exist in HTML file






// Step 5: Function to add a new todo
// Function to add a new todo: This function creates a new todo object and adds it to the array.
export const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(), // Generate a unique ID based on the current timestamp
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  console.log("Todo added: ", todos); // Log the updated list of todos to the console
  renderTodos(); // Render the updated list of todos => create the function next
};


const countTodos = (): number => {
  return todos.length; // Return the total count of todos
};
console.log(`Total todos: ${countTodos()}`);






/* ------------------ 1. FUNCTION ------------------- */

// Step 6: Function to render the list of todos
const renderTodos = (): void => {
  // Clear the current list
  todoList.innerHTML = '';

  // Iterate over the todos array and create list items for each todo
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add a class to the list item

    // Use template literals to create the HTML content for each list item
    li.innerHTML = `
      <input type="checkbox" id="checkbox-${todo.id}" ${todo.completed ? 'checked' : ''}>
      <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'};">${todo.text}</span>
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;

    // Add event listener to handle checkbox toggling
    const checkbox = li.querySelector(`input[type="checkbox"]`) as HTMLInputElement;
    checkbox?.addEventListener('change', () => {
      todo.completed = checkbox.checked; // Update the completed status
      renderTodos(); // Re-render the list to reflect the change
    });

    // Add event listeners for the remove and edit buttons
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li); // Append the list item to the ul element
  });
};






// Step 6.1: Function to render the list of todos
// Initial render
renderTodos(); // Call the renderTodos function to display the initial list of todos : Should be at the end of the code to ensure that the function is defined before it is called.
// The initial render is important to display the list of todos when the page is first loaded. Without it, the list would be empty until a new todo is added.
// Move it when code is complete ( refactoring ) 


// Step 7: Event listener for the form submission
// Event listener for the form submission: This listener handles the form submission, adds the new todo, and clears the input field.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace - not needed, but good practice
  if (text !== '') { // Check if the input field is not empty. Sort of a reverse falsey
    addTodo(text);
    todoInput.value = ''; // Clear the input field
  }
});





//Improved code for step 7 - user input validation - move the error message to the top of the Typescript file
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement; // Should be moved to the top + added to the HTML file

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const text = todoInput.value.trim(); // Get the value of the input field and remove any leading or trailing whitespace

  if (text !== '') { // Check if the input field is empty
    todoInput.classList.remove('input-error'); // Remove the error highlight if present
    errorMessage.style.display = 'none'; // Hide the error message
    addTodo(text); // Add the todo item
    todoInput.value = ''; // Clear the input field
  } else {
    console.log("Please enter a todo item"); // Provide feedback to the user
    todoInput.classList.add('input-error'); // Add a class to highlight the error
    errorMessage.style.display = 'block'; // Show the error message
  }
});



// Step 8: Function to removes all a todo by ID
// Function to add event listener to the remove button - this function has an callback function that removes the todo item from the array.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => removeTodo(id)); // We have an optional chaining operator here to avoid errors if the button is not found - for example, if the button is removed from the DOM.
};
/*
example of explicit null checking - without optional chaining operator, but basically the same as above
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  if (removeButton) {
    removeButton.addEventListener('click', () => removeTodoById(id));
  } else {
    console.error(`Remove button not found for todo item with ID: ${id}`);
  }
};
*/


// Step 8: Function to remove a todo by ID
// Function to remove a todo by ID: This function removes a todo from the array based on its ID.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(); // Re-render the updated list of todos
}; 


// Edit event listener - make button and add button to each todo
const addEditButtonListener = (li: HTMLLIElement, id:number) => {
  // make use of the editBtn id to edit the todo
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id)) 
}

// Edit function - prompt user to edit the todo : editTodo
const editTodo = (id:number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('Edit todo', todo.text)
    if (text) {
      todo.text = text
      renderTodos()
    }
  }
}






/* ---------------------------- 2. FUNCTION --------------------------- */


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




/*------------------------ 3. FUNCTION ------------------------------------------ */

// Step 9: Function to mark all todos as complete
const markAllAsComplete = (): void => {
  todos.forEach(todo => {
    todo.completed = true; // Set each todo's completed status to true
  });
  renderTodos(); // Re-render the updated list of todos
};

// Create and add the Mark All as Complete button to the container
const markAllCompleteButton = document.createElement('button');
markAllCompleteButton.textContent = 'Mark All';
markAllCompleteButton.id = 'mark-all-completed';
markAllCompleteButton.addEventListener('click', markAllAsComplete); // Add click listener to call the function

// Append the button to the container
if (container) {
  container.appendChild(markAllCompleteButton);
}



/*------------------------ 5. FUNCTION ------------------------------------------ */
/*------------------------ 4. FUNCTION ------------------------------------------ */

// Function to toggle between light and dark mode
const toggleTheme = (): void => {
  document.body.classList.toggle('dark-mode');
};

// Create and add the Theme Toggle button
const themeToggleButton = document.createElement('button');
themeToggleButton.textContent = 'Theme';
themeToggleButton.id = 'light-dark-mode';
themeToggleButton.addEventListener('click', toggleTheme);
container?.appendChild(themeToggleButton);

// Function to count completed todos and display the count
const showCompletedCount = (): void => {
  const completedCount = todos.filter(todo => todo.completed).length; // Count completed todos
  const countDisplay = document.getElementById('completed-count') as HTMLParagraphElement; // Reference to the display element
  countDisplay.textContent = `Completed Todos: ${completedCount}`; // Update the display with the count
};

// Attach the function to the button
document.getElementById('show-completed-count')?.addEventListener('click', showCompletedCount);


/**
 * color picker
 */

// Function to change the background color of the page based on the color picker value
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

// Function to initialize the color picker event listener
const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement; // encapsulate the color picker element to this function
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