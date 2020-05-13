let myLibrary = [];

function Book(title, author, numpages, editorial, readflag) {
  this.title = title;
  this.author = author;
  this.numpages = numpages;
  this.editorial = editorial;
  this.readflag = readflag;
}

function saveLocalAndRender() {
  localStorage.setItem('myLib', JSON.stringify(myLibrary));
  render(); // eslint-disable-line no-use-before-define
}

function render() {
  const table = document.getElementById('lib-table');
  table.innerHTML = '';
  let index = 1;
  myLibrary.forEach((book) => {
    const tableRow = table.insertRow();
    const indexCol = document.createElement('th');
    indexCol.innerHTML = index;
    index += 1;
    tableRow.appendChild(indexCol);

    const titleCol = tableRow.insertCell(1);
    titleCol.innerHTML = book.title;

    const authorCol = tableRow.insertCell(2);
    authorCol.innerHTML = book.author;

    const pagesCol = tableRow.insertCell(3);
    pagesCol.innerHTML = book.numpages;

    const editorCol = tableRow.insertCell(4);
    editorCol.innerHTML = book.editorial;

    const readCol = tableRow.insertCell(5);
    const readButton = document.createElement('button');

    function readBtnAction() {
      readButton.innerText = (book.readflag) ? 'Read' : 'Reading';
      if (book.readflag) {
        readButton.setAttribute('class', 'btn btn-outline-success');
      } else {
        readButton.setAttribute('class', 'btn btn-outline-info');
      }
    }

    readBtnAction();
    readCol.appendChild(readButton);

    readButton.onclick = function changeRead() {
      book.readflag = !book.readflag;
      readBtnAction();
      saveLocalAndRender();
    };

    const removeCol = tableRow.insertCell(6);
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.classList.add('btn', 'btn-outline-danger');
    removeButton.onclick = function removeBook() {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      saveLocalAndRender();
    };
    removeCol.appendChild(removeButton);
  });
}

function cleanForm() {
  document.getElementById('new-title').value = '';
  document.getElementById('new-author').value = '';
  document.getElementById('new-pages').value = '';
  document.getElementById('new-editorial').value = '';
}

function addBookToLibrary() {
  const addTitle = document.getElementById('new-title').value;
  const addAuthor = document.getElementById('new-author').value;
  const addPages = document.getElementById('new-pages').value;
  const addEditorial = document.getElementById('new-editorial').value;
  const radio = document.getElementById('read');
  const addStatus = (radio.checked) ? true : false; // eslint-disable-line no-unneeded-ternary
  const newBook = new Book(addTitle, addAuthor, addPages, addEditorial, addStatus);
  myLibrary.push(newBook);
  cleanForm();
  saveLocalAndRender();
}

function populateBooks() {
  myLibrary.push(new Book('book01', 'author01', 11, 'editorial01', true));
  myLibrary.push(new Book('book02', 'author02', 22, 'editorial02', false));
  myLibrary.push(new Book('book03', 'author03', 33, 'editorial03', true));
}

if (localStorage.getItem('myLib') === null) {
  populateBooks();
  localStorage.setItem('myLib', JSON.stringify(myLibrary));
} else {
  myLibrary = JSON.parse(localStorage.getItem('myLib'));
}

const addButton = document.getElementById('addBook');
addButton.onclick = function addingBook() {
  addBookToLibrary();
};

render();
