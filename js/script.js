let myLibrary = [];

function Book(title, author, numpages, editorial, readflag) {
  this.title = title;
  this.author = author;
  this.numpages = numpages;
  this.editorial = editorial;
  this.readflag = readflag;
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

    // title
    const titleCol = tableRow.insertCell(1);
    titleCol.innerHTML = book.title;

    // author
    const authorCol = tableRow.insertCell(2);
    authorCol.innerHTML = book.author;

    // number of pages
    const pagesCol = tableRow.insertCell(3);
    pagesCol.innerHTML = book.numpages;

    // editorial
    const editorCol = tableRow.insertCell(4);
    editorCol.innerHTML = book.editorial;

    // status tbn
    const readCol = tableRow.insertCell(5);
    const readButton = document.createElement('button');
    readBtnAction();
    readCol.appendChild(readButton);

    function readBtnAction() {
      readButton.innerText = (book.readflag) ? 'Read' : 'Reading';
      if (book.readflag) {
        readButton.setAttribute('class', 'btn btn-outline-success');
      } else {
        readButton.setAttribute('class', 'btn btn-outline-info');
      }
    }

    readButton.onclick = function () {
      book.readflag = !book.readflag;
      readBtnAction();
      saveLocalAndRender();
    };

    // remove tbn
    const removeCol = tableRow.insertCell(6);
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.classList.add('btn', 'btn-outline-danger');
    removeButton.onclick = function () {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      saveLocalAndRender();
    };
    removeCol.appendChild(removeButton);

  });
}

// clean form
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
  const addStatus = (radio.checked) ? true : false;
  console.log(addStatus);
  const newBook = new Book(addTitle, addAuthor, addPages, addEditorial, addStatus);
  myLibrary.push(newBook);
  cleanForm();
  saveLocalAndRender();
}

// save to local storage and render lib
function saveLocalAndRender() {
  localStorage.setItem('myLib', JSON.stringify(myLibrary));
  render();
}

// populateBooks
function populateBooks() {
  myLibrary.push(new Book('book01', 'author01', 11, 'editorial01', true));
  myLibrary.push(new Book('book02', 'author02', 22, 'editorial02', false));
  myLibrary.push(new Book('book03', 'author03', 33, 'editorial03', true));
}

// store lib in localstorage
if (localStorage.getItem('myLib') === null) {
  populateBooks();
  localStorage.setItem('myLib', JSON.stringify(myLibrary));
} else {
  myLibrary = JSON.parse(localStorage.getItem('myLib'));
}
render();
