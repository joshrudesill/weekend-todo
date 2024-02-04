console.log("JS is sourced!");
function getTodos() {
  axios
    .get("/todos")
    .then((response) => {
      console.log(response);
      refreshDOM(response.data);
    })
    .catch((err) => console.error(err));
}
getTodos();

const refreshDOM = (d) => {
  let domNode = document.querySelector("#todos");
  domNode.innerHTML = "";
  for (const todoItem of d) {
    const { id, todo, notes, isComplete } = todoItem;
    domNode.innerHTML += `
      <tr class="font-medium text-gray-900 whitespace-nowrap border-b ${
        isComplete ? "completed" : ""
      }" data-testid="toDoItem">
        <td class="pr-6 py-2">${todo}</td>
        <td class="px-6 py-2">${notes}</td>
        
        ${
          !isComplete
            ? `<td class="px-6"><button class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-md text-sm px-3 py-1.5 text-center"
            onclick='markReady(${id})' data-testid="completeButton">Mark Done</button></td>`
            : `<td class="px-6">
                <div class="bg-green-500 rounded-sm text-center w-min p-1.5">Done</div>
              </td>`
        }
        
        <td class="px-6"><button onclick='deleteRow(${id})' data-testid="deleteButton" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-md text-sm px-3 py-1.5 text-center">Delete</button></td>
      </tr>
      `;
  }
};

function saveTodo(event) {
  event.preventDefault();
  let todo = document.querySelector("#todoName");
  let notes = document.querySelector("#notesIn");
  let data = {
    todo: todo.value,
    notes: notes.value,
  };
  // axios call to server to get koalas
  todo.value = "";
  notes.value = "";
  axios({ method: "POST", url: "/todos", data: data })
    .then((_) => getTodos())
    .catch((err) => console.error(err));
}
function markReady(id) {
  axios
    .put(`/todos/${id}`)
    .then((_) => getTodos())
    .catch((err) => console.error(err));
}
function deleteRow(id) {
  axios
    .delete(`/todos/${id}`)
    .then((result) => {
      getTodos();
    })
    .catch((err) => console.error(err));
}
