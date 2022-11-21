import { Todo } from "./models/Todo";


//hämtar listan från local storage
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

//lyssnar efter knapptryck på rensa-listan och anropar funktionen som rensar.
document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});


//hämtar elmentet för formuläret, om det finns och lyssnar efter knapptryck på submit-knappen
(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",

  //använder preventdefault för att sidan ej ska laddas om vid submit
  (e: SubmitEvent) => {
    e.preventDefault();

    //skapar variabel vars värde hämtas från input-elementet
    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    console.log("Todos when creating", todos);

    
    createNewTodo(todoText, todos);
  }
);

//funktionen kontrollerar att användaren har skrivit ett ord som är minst tre bokstäver långt. 
//Om det är sant skapas ett nytt objekt annars skrivs error medelande ut. 

function createNewTodo(todoText: string, todos: Todo[]) {
  if (todoText.length > 2) {
    displayError("", false);
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);

    createHtml(todos);
  } else {
    displayError("Du måste skriva in minst tre tecken som uppgift", true);
  }
}

//sparar todo- sakerna som en lista i local storage
function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  //skapar container för todo- sakerna
  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

// tömmer containern?
  todosContainer.innerHTML = "";

//loopar igenom listan och skriver ut varje todo i en li-tagg
  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    // om todo är klar läggs en class med scss-styling till på li-taggen som stryker över texten
    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    //här skrivs texten ut och blir klickbar, alla todo går igenom detta steg men hoppas
    // if:en över blir det utan ett streck över texten. Sätter även igång funktionen som hanterar clicket.
    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

//toggle, vid klick ändrar på done till det motsatta värdet. 
function toggleTodo(todo: Todo) {
  todo.done = !todo.done;
  createHtml(todos);
}

//hämtar diven med id error, ändrar innehållet till error, error är en parameter som skapas här?
function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;
// om funktionen createNewTodo är mindre än 2 långt ändras show till true, då läggs klassen show till som
// med hjälp av scss gör att elementet inte syns på skärmen.
  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

// rensa knappen, tar bort innehåll i listan från position noll och hela listans längd
function clearTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
  createHtml(todos);
}

// varför står den här?
createHtml(todos);
