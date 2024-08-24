const noteContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

// Function to display notes from localStorage
function showNotes() {
    noteContainer.innerHTML = localStorage.getItem('notes') || '';
}

// Initial call to load notes when the page loads
showNotes();

// Function to update localStorage with current notes
function updateStorage() {
    
    localStorage.setItem('notes', noteContainer.innerHTML);

}

// Event listener for creating a new note
createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let image = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    image.src = 'images/delete.png';

    inputBox.appendChild(image); // Append image to inputBox
    noteContainer.appendChild(inputBox); // Append inputBox to noteContainer

    // Update storage after creating a new note
    updateStorage();

    // Bind keyup event to the new note to update storage on edit
    inputBox.addEventListener('keyup', updateStorage);
});

// Event listener for handling note interactions (delete or edit)
noteContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        // If delete image is clicked, remove the note
        e.target.parentElement.remove();
        updateStorage();
    } 
});

// Attach keyup event to all notes (for existing notes)
notes.forEach(nt => {
    nt.addEventListener('keyup', updateStorage);
});

noteContainer.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        document.execCommand('insertLineBreak');
        e.preventDefault();
    }
});


