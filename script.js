const toDo = document.getElementById("todo");
const addToDo = document.getElementById("myButton");
const valueList = document.getElementById("valueList");

// Function to create a new list item with the same styling
function createListItem(toDoValue) {

  // Create a new to-do item
  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(toDoValue))
  valueList.appendChild(listItem);
  listItem.classList.add("listItem");

  // Add a delete button
  const dlBtn = document.createElement("button");
  dlBtn.innerHTML = "x";
  dlBtn.classList.add("dl-btn");
  listItem.appendChild(dlBtn);
  listItem.classList.add("hover");
  
  // Delete
  dlBtn.addEventListener("click", function () {
    valueList.removeChild(listItem);
    removeTaskFromLocalStorage(toDoValue);
  })

  // Crossed out
  listItem.addEventListener("click", function () {
    listItem.classList.add("crossed-out");
  })

  return listItem;

}

function addTask() {
    // Get the todo value and trim for clean data
    const toDoValue = toDo.value.trim();

    if (toDoValue) {
      const listItem = createListItem(toDoValue);
      saveTasksToLocalStorage(toDoValue);

        // Reset input
        toDo.value = '';

    }
}

function saveTasksToLocalStorage(toDoValue) {
    let toDoValues = JSON.parse(localStorage.getItem("toDoValues")) || [];
    toDoValues.push(toDoValue);
    localStorage.setItem("toDoValues", JSON.stringify(toDoValues));
}

function removeTaskFromLocalStorage(toDoValue) {
  let toDoValues = JSON.parse(localStorage.getItem("toDoValues")) || [];
  const index = toDoValues.indexOf(toDoValue);
  if (index !== -1) {
    toDoValues.splice(index, 1);
    localStorage.setItem("toDoValues", JSON.stringify(toDoValues));
  }
}

document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
})

function loadTasks() {
  let storedTasks = JSON.parse(localStorage.getItem("toDoValues"));

  if(storedTasks) {
    storedTasks.forEach(toDoValue => {
      const listItem = createListItem(toDoValue);
    });
  }
}

// window.onload = function
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`Key: ${key}, Value: ${value}`);
}

localStorage.removeItem("tasks");

addToDo.addEventListener("click", addTask)
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || KeyboardEvent.code === 13) {
        addTask();
    }
})

