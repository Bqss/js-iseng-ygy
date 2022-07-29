const RENDER_EVENT = 'render-todo';
let todos = [];

// ini menambahkan sebuah costum event kepada document
document.addEventListener(RENDER_EVENT , () => {
    const unCompleteTodo = document.querySelector('#todo');
    const completeTd = document.getElementById('complete-td')
    let unc = '';
    let complt ='';
    for(const td of todos){
        if(!td.isComplete) unc+= createTodo(td)
        else complt += createTodo(td)
    }
    unCompleteTodo.innerHTML = `<h2 class="container-header">Hal yang harus dilakukan</h2>` + unc;
    completeTd.innerHTML = `<h2 class="container-header">Hal yang sudah dilakukan</h2>` + complt;
    

    
});
window.addEventListener('DOMContentLoaded', (event) => {
    const todoForm = document.querySelector('#form');
    todoForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        addTodo();
        document.dispatchEvent(new Event(RENDER_EVENT));
    })
});

document.addEventListener('click',(event) => {
    const todo = event.target.parentElement;
    if(event.target.classList.contains('check-button')){
        addTodoToCompleted(todo);
        document.dispatchEvent(new Event(RENDER_EVENT));

    }else if(event.target.classList.contains('trash-button')){
        deleteTodo(todo)
        document.dispatchEvent(new Event(RENDER_EVENT));

    }else if(event.target.classList.contains('undo-button')){
        backToUnc(todo);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
    
});

const deleteTodo = (todo) => {
    todos = todos.filter( v => v.id != todo.id)
}
const addTodo = () => {
    const todosForm = document.querySelector('#form');
    tdTxt = todosForm.querySelector('#title')
    tdDate = todosForm.querySelector('#date')
    const todo = generateTodo(generateId(), tdTxt.value, tdDate.value);
    tdDate.value ="";
    tdTxt.value ="";
    todos.push(todo)
}

const backToUnc = (todo) => {
    todos.find( e => e.id == todo.id).isComplete = false ;
}
const addTodoToCompleted = (todo) => {
    todos.find(e =>  e.id == todo.id).isComplete = true;
    
}
const generateTodo  = (id, todoTxt, date ) => {
    return {
        id ,
        todoTxt ,
        date,
        isComplete : false
    }
}

const generateId = () => {
    return new Date().getTime();
}

const createTodo = (todo) => {
    return  `

        <div class="item" id="${todo.id}">
            <div class="inner">
                <h2>${todo.todoTxt}</h2>
                <p>${todo.date}</p>
            </div>
            ${todo.isComplete ? `<button class="undo-button"></button><button class="trash-button"></button>`: `<button class="check-button"></button>`}
        </div>
        

    `
}

