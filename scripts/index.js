const noteTitle = document.getElementById("title");
const noteDescription = document.getElementById("title");

let notes = [];


addEventListener("DOMContentLoaded", () => {
    addNotes(getNotesFromDatabase());

    addEventListener("submit", () => {
        addNotes([[document.getElementById("noteTitle").value,
            document.getElementById("noteContent").value]])
    })
})

function addNotes(notesToAdd) {
    notes = notes.concat(notesToAdd);
    displayNotes();
}

function displayNotes() {
    let html = "";
    const titleIndex = 0;
    const descriptionIndex = 1;

    for (let i = 0; i < notes.length; i++) {
        html += "<div><h2>" + notes[i][titleIndex] + "</h2>" +
            "<p>" + notes[i][descriptionIndex] + "</p></div>";
    }

    document.getElementById("noteContainer").innerHTML = html;
    return 0;
}

function getNotesFromDatabase(){
    //Query c# database

    return [["My first Note", "This is a test"],["My second Note", "This is not a test"]];
}