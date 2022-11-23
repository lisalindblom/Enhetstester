"use strict";
exports.__esModule = true;
exports.removeAllTodos = exports.changeTodo = exports.addTodo = void 0;
var Todo_1 = require("./models/Todo");
function addTodo(todoText, todos) {
    if (todoText.length > 2) {
        var newTodo = new Todo_1.Todo(todoText, false);
        todos.push(newTodo);
        return { success: true, error: "Du måste ange minst två bokstäver" };
    }
    else {
        return { success: false, error: "Du måste ange minst två bokstäver" };
    }
}
exports.addTodo = addTodo;
function changeTodo(todo) {
    todo.done = !todo.done;
}
exports.changeTodo = changeTodo;
function removeAllTodos(todos) {
    todos.splice(0, todos.length);
}
exports.removeAllTodos = removeAllTodos;
