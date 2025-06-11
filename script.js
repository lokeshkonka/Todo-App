document.addEventListener('DOMContentLoaded',()=>{
    console.log("check");

const todoinput = document.getElementById("todo-input");

const addtaskbutton = document.getElementById("add-task-btn");
const tasklist = document.getElementById("todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks"))||[] ;
tasks.forEach((task)=>rendertask(task));
addtaskbutton.addEventListener('click',function(){
    const tasktest = todoinput.value.trim()
    if(tasktest === "") return;  // check whether the input is written or not
    const newtask ={
        id:Date.now(),
        text:tasktest,
        completed:false
    }// creates a new task , id for the to do
    tasks.push(newtask);// adding to the tasks array
    savetasks()
    todoinput.value = "" // clear the value
    console.log(tasks);
    rendertask(newtask); // render the task
    
});
function rendertask(t){
 const li = document.createElement('li');
 li.setAttribute("data-id",t.id)
 li.innerHTML = `<span>${t.text}</span> <button>Delete</button>`
 tasklist.appendChild(li)
 li.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON' ) return;
    t.completed = ! t.completed
    li.classList.toggle('completed') //  takes boolean value
    savetasks()
  });
   tasklist.appendChild(li);
 li.querySelector('button').addEventListener('click',(e)=>{
    console.log("Clicked oon the delete");
    e.stopPropagation() //prevent toggle  firings
    tasks = tasks.filter(tt => tt.id !== t.id)
    li.remove()
    savetasks()
});
}
function savetasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
})