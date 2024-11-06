import {Selector} from "testcafe";

fixture ("ToDo app tests")
    .page("https://test.michaelajanceova.com/todo/")



    test('Toggle between light and dark mode', async t => {
        const themeToggleButton = Selector('#light-dark-mode');
        const bodyElement = Selector('body');
    
        // Ensure initial state (light mode)
        await t.expect(bodyElement.hasClass('dark-mode')).notOk();
    
        // Click the toggle button to switch to dark mode
        await t.click(themeToggleButton);
        await t.expect(bodyElement.hasClass('dark-mode')).ok();
    
        // Click the toggle button again to switch back to light mode
        await t.click(themeToggleButton);
        await t.expect(bodyElement.hasClass('dark-mode')).notOk();
    });
    

    
    test('should add a new todo and render it', async t => {
        // Adding a new todo
        await addTodo(t, 'New Todo Item');
      
        // Check that the new todo is rendered
        const newTodo = Selector('li.todo-item').withText('New Todo Item');
        await t.expect(newTodo.exists).ok();
      });
  
  
    test('Show completed todos count', async t => {
    // Step 1: Add some todos
    await addTodo(t, 'Test Todo 1');
    await addTodo(t, 'Test Todo 2');
    await addTodo(t, 'Test Todo 3');
    
    // Step 2: Mark the first two todos as completed
    const checkbox1 = Selector('input[type="checkbox"]').nth(0);
    const checkbox2 = Selector('input[type="checkbox"]').nth(1);
  
    await t
      .click(checkbox1)  // Mark first todo as completed
      .click(checkbox2); // Mark second todo as completed
  
    // Step 3: Click the "Show Completed Count" button
    const showCompletedCountButton = Selector('#show-completed-count');
    const countDisplay = Selector('#completed-count');
    
    await t
      .click(showCompletedCountButton) // Click to show the completed todos count
      .expect(countDisplay.textContent).eql('Completed Todos: 2'); // Verify the count
  });
    