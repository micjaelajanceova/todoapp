import {Selector} from "testcafe";

fixture ("ToDo App tests")
    .page("https://test.michaelajanceova.com/todo/")



    test('Mark all todos as completed', async t => {
        await t
            .typeText(Selector('#todo-input'), 'First Todo')
            .pressKey('enter')
            .typeText(Selector('#todo-input'), 'Second Todo')
            .pressKey('enter')
            .click(Selector('#mark-all-completed'));
    
        const todosCount = await Selector('.todo-item').count;
        for (let i = 0; i < todosCount; i++) {
            await t.expect(Selector('.todo-item').nth(i).hasClass('completed')).ok();
        }
    });


    test('Move todo up and down', async t => {
        await t
            .typeText(Selector('#todo-input'), 'First Todo')
            .pressKey('enter')
            .typeText(Selector('#todo-input'), 'Second Todo')
            .pressKey('enter');
    
        const firstTodoText = await Selector('.todo-item').nth(0).innerText;
        const secondTodoText = await Selector('.todo-item').nth(1).innerText;
    
        // Presunieme prvú úlohu nadol
        await t.click(Selector('.todo-item').nth(0).find('.move-down'));
    
        // Overíme, že sa úlohy vymenili
        await t
            .expect(Selector('.todo-item').nth(0).innerText).eql(secondTodoText)
            .expect(Selector('.todo-item').nth(1).innerText).eql(firstTodoText);
    
        // Presunieme druhú úlohu (teraz prvú) naspäť hore
        await t.click(Selector('.todo-item').nth(1).find('.move-up'));
    
        // Overíme, že sa úlohy vrátili do pôvodného poradia
        await t
            .expect(Selector('.todo-item').nth(0).innerText).eql(firstTodoText)
            .expect(Selector('.todo-item').nth(1).innerText).eql(secondTodoText);
    });
    