const container = document.querySelector("#container");
const task = document.querySelector("#task");
const loaderContainer = document.querySelector("#loaderContainer");
const loader = document.querySelector("#loader");
const button = document.querySelector("#btn");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const datas = document.querySelector("#datas");

loader.setAttribute('alt', 'loading');
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loaderContainer.remove()
    }, 2000)
});

function createToDo(data) {
    return `
        <div id="form">
            <p>${data.name}</p>
            <span data-id = ${data.id} class="delete">Delete</span>
        </div>
    `
}

function validate(task) {
    if (task.value.length < 6) {
        alert("TO DO Eng kamida 6 ta belgidan iborat bo'lishi kerak!");
        task.focus();
        task.style.outlineColor = 'red';
        return false
    }

    return true
}

function getDataFromLocalStorage() {
    let data = [];
    if (localStorage.getItem('todos')) {
        data = JSON.parse(localStorage.getItem('todos'));
    }
    return data;
}


button && button.addEventListener('click', function(event) {
    event.preventDefault();
    
    let isValid = validate(task);
    if (!isValid) {
        return
    }
    
    let todo = {
        id: Date.now(),
        name : task.value
    }
    
    const toDo = createToDo(todo);
    datas.innerHTML += toDo;
    task.value = '';
    
    let todos = getDataFromLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
})

document.addEventListener('DOMContentLoaded', function() {
    let todos = getDataFromLocalStorage();
    
    todos.forEach(todo => {
        let card = createToDo(todo);
        datas.innerHTML += card;
    })
    
    const deleteEl = document.querySelectorAll(".delete");

    deleteEl.length > 0 && deleteEl.forEach(del => {
        del && del.addEventListener('click', function(event) {
            let isDelete = confirm("Rostdan ham o'chirmoqchimisiz?")
            if (isDelete) {
                this.parentNode.remove();
                let id = this.getAttribute('data-id');
                if (id) {
                    todos = todos.filter(todo => {
                        return todo.id != id;
                    })

                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            }
        })
    })
})