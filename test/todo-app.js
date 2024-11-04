import {Selector} from "testcafe";

fixture ("ToDo app tests")
    .page("https://test.michaelajanceova.com/todo/")



    test("Dummy", async t => {
    
        await t
            .expect(true).eql(true);
    
    })