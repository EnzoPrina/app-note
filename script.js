const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Obtener notas de almacenamiento local si existen y analizarlas
// al objeto js más pasando una matriz vacía a las notas
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;


addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});


function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `        
    <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="fi fi-bs-menu-dots"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fi fi-rr-edit">${' '} </i></li>
                    <li onclick="deleteNote(${index})"><i class="fi fi-rr-trash">${''}</i></li>
                </ul>
            </div>
        </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName !=  "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
};
function deleteNote(noteId){
    let confirmDel = confirm('¿Estás seguro que quieres eliminar esta nota?')
    if(!confirmDel) return;
    notes.splice(noteId, 1);  // eliminando la nota seleccionada de la matriz/tareas
    localStorage.setItem("notes", JSON.stringify(notes)); // guardando a local storage una nota
    showNotes();
}


function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        // obteniendo mes, dia y año a partir de la fecha actual
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${day} ${month}, ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo) // agregando una nueva nota a las
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; // actualizando la nota especificada
        }
            
            localStorage.setItem("notes", JSON.stringify(notes)); // guardando a local storage una nota
            closeIcon.click();
            showNotes();
    }
});