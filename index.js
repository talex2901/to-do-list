let deletingItemId;
const tasks = [
  {
    id: "1138465078061",
    completed: false,
    text: "Посмотреть новый урок по JavaScript",
  },
  {
    id: "1138465078062",
    completed: false,
    text: "Выполнить тест после урока",
  },
  {
    id: "1138465078063",
    completed: false,
    text: "Выполнить ДЗ после урока",
  },
];
tasks.forEach((item) => addTask(item.id, item.completed, item.text));

const formToAdd = document.querySelector(".create-task-block");
formToAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  const textToAdd = event.target.taskName.value;

  const isContains = contains(tasks, textToAdd);
  if (isContains) {
    const errorText = document.querySelector(".create-task-block");
    const span2 = document.createElement("span");
    const errorText2 = document.querySelector(".error-message-block");
    errorText2.remove();
    span2.innerText = "Задача с таким названием уже существует.";
    span2.className = "error-message-block";
    errorText.append(span2);
    return;
  }
  if (textToAdd === "") {
    const errorText = document.querySelector(".create-task-block");
    const span2 = document.createElement("span");
    const errorText2 = document.querySelector(".error-message-block");
    if (errorText2) {
      errorText2.remove();
    }
    span2.innerText = "Название задачи не должно быть пустым";
    span2.className = "error-message-block";
    errorText.append(span2);
    span2.classList.toggle(".error-message-block");
    return;
  }
  if (!isContains || textToAdd != "") {
    const errorText2 = document.querySelector(".error-message-block");
    if (!errorText2) {
    } else {
      errorText2.remove();
    }
  }
  const newId = new Date().getTime().toString();
  addTask(newId, false, textToAdd);

  tasks.push({
    id: newId,
    completed: false,
    text: textToAdd,
  });

  function contains(arr, elem) {
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].text === elem) {
        result = true;
      }
    }
    return result;
  }

  console.log(tasks);
});

function addTask(id, completed, text) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  taskItem.setAttribute("data-task-id", id);

  const mainContainer = document.createElement("div");
  mainContainer.className = "task-item__main-container";

  const mainContent = document.createElement("div");
  mainContent.className = "task-item__main-content";

  const form = document.createElement("form");
  form.className = "checkbox-form";

  const input = document.createElement("input");
  input.className = "checkbox-form__checkbox";
  input.type = "checkbox";
  input.id = id;

  const label = document.createElement("label");
  label.htmlFor = id;

  const span = document.createElement("span");
  span.className = "task-item__text";
  span.innerText = text;

  const button = document.createElement("button");
  button.className = "task-item__delete-button default-button delete-button";
  button.setAttribute("data-delete-task-id", id);
  button.innerText = "Удалить";
  const taskList = document.querySelector(".tasks-list");

  const errorMessageBlock = document.createElement("errorMessageBlock");
  errorMessageBlock.className = "error-message-block";

  taskList.append(taskItem);
  taskItem.append(mainContainer);
  mainContainer.append(mainContent);
  mainContent.append(form);
  form.append(input);
  form.append(label);
  form.after(span);
  mainContent.after(button);
  form.after(errorMessageBlock);
}

const modalWindow = document.createElement("div");
modalWindow.innerHTML = `<div class="modal-overlay modal-overlay_hidden">
<div class="delete-modal">
  <h3 class="delete-modal__question">
    Вы действительно хотите удалить эту задачу?
  </h3>
  <div class="delete-modal__buttons">
    <button class="delete-modal__button delete-modal__cancel-button">
      Отмена
    </button>
    <button class="delete-modal__button delete-modal__confirm-button">
        Удалить
    </button>
  </div>
</div>
</div>;
`;
document.body.append(modalWindow);

const tasksByClass = document.querySelector(`.tasks-list`);

tasksByClass.addEventListener("click", (event) => {
  if (event.target.classList.contains("task-item__delete-button")) {
    deletingItemId = event.target.getAttribute("data-delete-task-id");
    const popup = document.querySelector(".modal-overlay_hidden");
    popup.classList.remove("modal-overlay_hidden");

    const popupConfirmButton = document.querySelector(
      ".delete-modal__confirm-button"
    );
    const popupCancelButton = document.querySelector(
      ".delete-modal__cancel-button"
    );
    popupConfirmButton.addEventListener("click", (event) => {
      const taskItem = document.querySelectorAll(".task-item");

      taskItem.forEach((el) => {
        const dataId = el.dataset.taskId;
        if (dataId === deletingItemId) {
          el.remove();
        }
      });
      tasks.forEach(function (el, i) {
        if (el.id === deletingItemId) {
          tasks.splice(i, 1);
          // const deleteHTML = taskItem.querySelector(deletingItemId);
        }
      });
      popup.classList.add("modal-overlay_hidden");
    });
    popupCancelButton.addEventListener("click", (event) => {
      popup.classList.add("modal-overlay_hidden");
    });
  }
});

// tasksByClass.forEach((item) => {
//   console.log(item);
//   const removeButton = item.querySelector(".task-item__delete-button");
//   const dataTaskId = item.getAttribute("data-task-id");

//   removeButton.addEventListener("click", (event) => {
//     console.log("delete ", dataTaskId);
//     item.remove();
//     tasks.filter
//   });
// });

// const divBatton = document.querySelector(".task-item__delete-button");
// divBatton.addEventListener("click", (event) => {
//   const taskList = document.querySelector(".tasks-list");
//   const deliteId = taskList.querySelector(".task-item");
//   const idToDelete = deliteId.getAttribute("data-task-id");
//   console.log(doubles);
//   if (idTasks == idToDelete) {
//     deliteId.remove(c);
//   }
// });

// const deleteButton = document.querySelector(".task-item__delete-button");
// deleteButton.addEventListener("click", (event) => {
//   const idToDelite = tasks.id;
//   console.log(idToDelete);
//   // const idToDelite = deleteButton.closest("data-task-id");
// });

const them = function (x) {
  if (x === 1) {
    document.querySelector("body").style.background = "#24292E";
    taskItem = document.querySelectorAll(".task-item");
    buttons = document.querySelectorAll("button");
    taskItem.forEach((el) => {
      el.style.color = "#ffffff";
    });
    buttons.forEach((el) => {
      el.style.border = "1px solid #ffffff";
    });
  }
  if (x === 2) {
    document.querySelector("body").style.background = "initial";
    taskItem = document.querySelectorAll(".task-item");
    buttons = document.querySelectorAll("button");
    taskItem.forEach((el) => {
      el.style.color = "initial";
    });
    buttons.forEach((el) => {
      el.style.border = "none";
    });
  }
};

document.addEventListener("keyup", (event) => {
  const { key } = event;
  const bodys = document.querySelector("body");
  const bodyBackground = bodys.style.background;
  console.log(bodyBackground);
  if (key === "Tab" && bodyBackground === "rgb(36, 41, 46)") {
    them(2);
  }
  if (key === "Tab" && bodyBackground !== "rgb(36, 41, 46)") {
    them(1);
  }
});
