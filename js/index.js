//* Select the Elements
const clear = document.querySelector(".clear");
const dateEl = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addme = document.getElementById("addme");
//* Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//* Variables
let LIST, id;
//* get item from localStorage
let data = localStorage.getItem("DailyTasks");
//* check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  //* if data isn't empty
  LIST = [];
  id = 0;
}
//* load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//! clear the local storage with confirmation
clear.addEventListener("click", function () {
  const msg = [
    "Do you want to delete all data?",
    "you pressed cancel!",
    "There is nothing to delete!",
  ];
  if (LIST.length > 0) {
    if (confirm(msg[0])) {
      localStorage.clear();
      window.location.reload();
    } else {
      msg[1];
    }
  } else {
    alert(msg[2]);
  }
});

//* Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateEl.innerHTML = today.toLocaleDateString("en-US", options);
//* add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}
addme.addEventListener("click", function () {
  //**Pressed Button
  const toDo = input.value;
  //* if the input isn't empty
  if (toDo) {
    addToDo(toDo, id, false, false);
    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });
    //* add item to localStorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("DailyTasks", JSON.stringify(LIST));
    id++;
  }
  input.value = "";
});

document.addEventListener("keyup", function (event) {
  //** */ Enter Key
  if (event.keyCode == 13) {
    const toDo = input.value;

    //* if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      //* add item to localStorage ( this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

//* complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}
//* remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}
//* target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  //* add item to localStorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("DailyTasks", JSON.stringify(LIST));
});
