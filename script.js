const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
}

function addBookToLibrary() {
    var table = document.getElementById('table');
    var title = document.getElementById('title');
    var author = document.getElementById('author');
    var status = document.getElementById('status');

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

    const book = new Book(title.value, author.value, status.value);
    myLibrary.push(book);

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    var newRow = table.insertRow();
    var titleCell = newRow.insertCell(0);
    var authorCell = newRow.insertCell(1);
    var statusCell = newRow.insertCell(2);
    var deleteCell = newRow.insertCell(3);

    titleCell.innerText = book.title;
    authorCell.innerText = book.author;
    statusCell.innerHTML = `<button class="${book.status}">${kebabToTitleCase(book.status)}</button>`;
    deleteCell.innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;

    title.value = '';
    author.value = '';
    status.selectedIndex = 0;
}

function loadLibrary() {
    var table = document.getElementById('table');

    myLibrary.forEach(book => {
        var newRow = table.insertRow();
        var titleCell = newRow.insertCell(0);
        var authorCell = newRow.insertCell(1);
        var statusCell = newRow.insertCell(2);

        titleCell.innerText = book.title;
        authorCell.innerText = book.author;
        statusCell.innerHTML = `<button onclick="deleteRow(this)" class="${book.status}">${kebabToTitleCase(book.status)}</button>`;
    });
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
}

function kebabToTitleCase(kebabStr) {
    return kebabStr
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Loads library on page load
window.onload = loadLibrary;