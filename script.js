const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(id, title, author, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.status = status;
}

function addBookToLibrary() {
    let table = document.getElementById('table');
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let status = document.getElementById('status');

    if (title.value.trim() === '') {
        title.setCustomValidity('Please enter the title of the book.');
        title.reportValidity();
        return;
    } else {
        title.setCustomValidity('');
    }

    if (author.value.trim() === '') {
        author.setCustomValidity('Please enter the author of the book.');
        author.reportValidity();
        return;
    } else {
        author.setCustomValidity('');
    }

    const id = Date.now(); // Generate a unique ID based on the current timestamp
    const book = new Book(id, title.value, author.value, status.value);
    myLibrary.push(book);

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    addBookToTable(book);

    title.value = '';
    author.value = '';
    status.selectedIndex = 0;
}

function addBookToTable(book) {
    let table = document.getElementById('table');
    let newRow = table.insertRow();
    newRow.setAttribute('id', `row-${book.id}`);
    
    let titleCell = newRow.insertCell(0);
    let authorCell = newRow.insertCell(1);
    let statusCell = newRow.insertCell(2);
    let deleteCell = newRow.insertCell(3);

    titleCell.innerText = book.title;
    authorCell.innerText = book.author;
    statusCell.innerHTML = `<button onclick="changeStatus(${book.id})" class="${book.status}">${kebabToUpperCase(book.status)}</button>`;
    deleteCell.innerHTML = `<button onclick="deleteRow(${book.id}, this)" class="delete">DELETE</button>`;
}

function loadLibrary() {
    let table = document.getElementById('table');
    // Clear existing rows except for the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    myLibrary.forEach(book => {
        addBookToTable(book);
    });
}

function changeStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        if (book.status === 'read') {
            book.status = 'not-read';
        } else if (book.status === 'not-read') {
            book.status = 'reading';
        } else {
            book.status = 'read';
        }
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

        let statusButton = document.querySelector(`#row-${bookId} button`);
        statusButton.textContent = kebabToUpperCase(book.status);
        statusButton.className = book.status;
    }
}

function deleteRow(bookId, button) {
    myLibrary.splice(myLibrary.findIndex(book => book.id === bookId), 1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    let row = button.parentNode.parentNode;
    row.remove();
}

function kebabToUpperCase(kebabStr) {
    return kebabStr
        .split('-')
        .map(word => word.toUpperCase())
        .join(' ');
}

window.onload = loadLibrary;