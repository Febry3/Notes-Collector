const addNote = document.querySelector(".addNote");
const popUp = document.querySelector(".popupBox");
const popUpTitle = popUp.querySelector("header p");
const closePopup = popUp.querySelector("svg");
const button = popUp.querySelector("button");
const search = document.getElementById("search");

var notes = JSON.parse(localStorage.getItem("notes") || "[]");

var isUpdate = false,
  id;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

search.addEventListener("click", () => {
  alert("Mending CTRL + F");
});

// <div contenteditable>${note.title}</div> bisa
function showNotes() {
  document.querySelectorAll(".noteWrapper").forEach((note) => note.remove());
  notes.forEach((note, i) => {
    var element = `
    <div class="noteWrapper">
      <div class="info">
        <p>${note.title}</p>
      
        <span>
        ${note.description}   
        </span>
      </div>
      <div class="bottom">
        <div class="date">
          <p>Created: <span> ${note.date}</span></p>
        </div>
        <div class="setting">
          <div class="edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-fill"
              viewBox="0 0 16 16"
              onclick = "updateNote(${i}, '${note.title}', '${note.description}')"
            >
              <path
                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
              />
            </svg>
          </div>
          <div class="delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
              onclick = "deleteNote(${i})"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>`;
    addNote.insertAdjacentHTML("afterend", element);
  });
}
showNotes();

function deleteNote(i) {
  notes.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(i, title, description) {
  isUpdate = true;
  id = i;
  addNote.click();
  document.getElementById("titl").innerText = title;
  document.getElementById("desc").innerText = description;
  popUpTitle.innerText = "Update Note";
  button.innerText = "Update";
}

function reset() {
  popUpTitle.innerText = "Add a Note";
  button.innerText = "Add";
}

addNote.addEventListener("click", () => {
  popUp.classList.add("active");
  reset();
});

closePopup.addEventListener("click", () => {
  isUpdate = false;
  popUp.classList.remove("active");
  var title = (document.getElementById("titl").innerText = "");
  var desc = (document.getElementById("desc").innerText = "");
  reset();
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  popUp.classList.remove("active");
  var noteTitle = document.getElementById("titl").innerText;
  var noteDesc = document.getElementById("desc").innerText;
  document.getElementById("titl").innerText = "";
  document.getElementById("desc").innerText = "";

  if (noteTitle || noteDesc) {
    var noteDate = new Date();
    var year = noteDate.getFullYear();
    var month = months[noteDate.getMonth()];
    var date = noteDate.getDate();

    const noteData = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${date}, ${year}`,
    };
    if (isUpdate) {
      isUpdate = false;
      notes[id] = noteData;
    } else {
      notes.push(noteData);
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    showNotes();
  }
});
