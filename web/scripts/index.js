let notes = [];
const titleIndex = 0;
const descriptionIndex = 1;
const noteId = 2;

addEventListener("DOMContentLoaded", () => {
    getNotesFromDatabase();

    addEventListener("submit", () => {
        addNotes([[document.getElementById("noteTitle").value,
            document.getElementById("noteContent").value]])
    })
})

function addNotes(notesToAdd) {
    notes = notes.concat(notesToAdd);
    displayNotes();
}

function removeNote(id){
    console.log(notes[id]);
    console.log("remove note id "+id + "  "+ notes[id][noteId])

    let response = fetch("http://localhost:3000/api/remove", {
        method: "POST",
        body: JSON.stringify(notes[id][noteId])
    }).then(res => res.json())
        .then(data => console.log(data))

    notes.splice(id, 1);

    displayNotes();
}

function displayNotes() {
    let html = "";

    for (let i = 0; i < notes.length; i++) {
        html += "<div><h2>" + notes[i][titleIndex] + "<button id=button" + i + ">x</button></h2>" +
            "<p>" + notes[i][descriptionIndex] + "</p>" +
            "</div>";
    }

    document.getElementById("noteContainer").innerHTML = html;

    for (let i = 0; i < notes.length; i++) {
        document.getElementById("button" + i).addEventListener("click", function () {
            removeNote(i)
        })
    }

    return 0;
}

function getNotesFromDatabase(){
    //Query c# database
    let array = [];

    let response = fetch("http://localhost:3000/api/update").then(response => response.json()).then(data => {
        addNotes(data);
    });
    //return [["My first Note", "This is a test"],["My second Note", "This is not a test"]];
}