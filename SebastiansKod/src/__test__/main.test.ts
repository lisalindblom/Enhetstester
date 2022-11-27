/**
 * @jest-environment jsdom
 */

import * as functions from "../ts/main" 
import { Todo } from "../ts/models/Todo";

// jest.spyOn(Storage.prototype, 'setItem');
// Storage.prototype.setItem = jest.fn();


//eventlistener för clearTodods - ligger inte i function, får vi lägga det i en funktion?

//Eventlistener för newTodo
//sen skapas html element vars värde skickas med när funktionen createNewTodo anropas.

//createNewTodo kontrollera att:
// - display error ändras till false
// test('should change error to false', ()=> {

// })
// - att en ny todo pushas till listan 
test('should add todo to list', ()=> {
    let todo: Todo[] = [new Todo('städa', false)];
    functions.createNewTodo('plugga', todo);
    expect(todo.length).toBe(2);
})
// -ska inte skapa ny todo om det inte skrivs in mer än två bokstäver

test ('should not add if todo <2', ()=> {
    let todos = new Todo("städa",false);
    localStorage.setItem("todos", JSON.stringify(todos));
    let theList: Todo [] = JSON.parse(localStorage.getItem("todos") || "[]");
    let length = theList.length;
    functions.createNewTodo("gå", theList);
    expect(theList.length).toBe(length);
});

//createHtml testa:
// -saker hamnar i local storage, ska testet hämta det då?

// -if satsen- lägger till en scss class
// -en till kotroll på om scss class läggs till
// -en eventlistener som sätter igång

//toggleTodo 
describe ("toggleTodo", ()=> {

    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
      });
    test ('should change boolean on todo', ()=>{
        let todoList: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        let todos: Todo = new Todo('träna',false);
        functions.toggleTodo(todos);
        expect(todos.done).toBe(true);
    });

    test("should call createHtml", ()=> {
        let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
        let todo: Todo = new Todo("städa",false);
        functions.toggleTodo(todo);
        expect(spy).toHaveBeenCalled();
    });
});

//displayError - en för if en för else

//clearTodos 
test('should empty list', ()=> {
    let todos: Todo[] = [new Todo('städa', false)];
    functions.clearTodos(todos);
    expect(todos.length).toBe(0);
});