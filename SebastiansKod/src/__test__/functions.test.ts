
import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe('addTodo', ()=> {

    test ('should add to list', ()=>{
        //arrange
        let theList: Todo[] = [new Todo("Städa",false)];
        let length = theList.length;
        //act
        addTodo('tvätta',theList);
        //assert
        expect(theList.length).toBe(length + 1);
    }); 
    
    test ('should not add if todo <2', ()=> {
        //arrange
        let theList: Todo[] = [new Todo('städa', false)];
        let length = theList.length;
        let todoItem = 'gå';
        //act
        addTodo(todoItem, theList);
        //assert
        expect(theList.length).toBe(length);
        
    });
});
    
test ('should change boolean on todo', ()=>{
    //arrange
    let todoItem: Todo = new Todo('träna',false);
    //act
    changeTodo(todoItem);
    //assert
    expect(todoItem.done).toBe(true);
    
});

test ('should empty list', ()=>{
    //arrange
    let theList: Todo[] = [new Todo('städa', false)];
    //act
    removeAllTodos(theList);
    //assert
    expect(theList.length).toBe(0);
});