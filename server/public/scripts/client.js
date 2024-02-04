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
      <tr>
        <td>${todo}</td>
        <td>${notes}</td>
        <td>${isComplete ? "Y" : "N"}</td>
        ${
          !isComplete
            ? `<td><button onclick='markReady(${id})'>Mark Ready</button></td>`
            : `<td><button onclick='markReady(${id})'>Mark UnReady</button></td>`
        }
        
        <td><button onclick='deleteRow(${id})'>Delete</button></td>
      </tr>
      `;
  }
};
