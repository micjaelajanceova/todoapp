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
    

    test('Display the completed todos count', async t => {
        const newTodoInput = Selector('#new-todo-input'); // Update this selector if needed
        const addTodoForm = Selector('.todo-form'); // Assuming form submission is used
        const showCompletedButton = Selector('#show-completed-count');
        const completedCountDisplay = Selector('#completed-count');
    
        // Step 1: Add a new todo
        await t
            .expect(newTodoInput.exists).ok("New Todo Input not found") // Debug line
            .typeText(newTodoInput, 'Test completed todo')
            .pressKey('enter'); // Use enter to submit if no add button exists
    
        // Step 2: Mark the new todo as completed
        const todoCheckbox = Selector('input[type="checkbox"]').nth(0); // Checkbox selector
        await t.expect(todoCheckbox.exists).ok("Checkbox not found"); // Debug line
        await t.click(todoCheckbox);
    
        // Step 3: Click the button to display completed count
        await t.expect(showCompletedButton.exists).ok("Show Completed Button not found"); // Debug line
        await t.click(showCompletedButton);
    
        // Step 4: Verify that the displayed count is 1 (as one todo was completed)
        await t.expect(completedCountDisplay.exists).ok("Completed Count Display not found"); // Debug line
        await t.expect(completedCountDisplay.textContent).eql('Completed Todos: 1');
    });