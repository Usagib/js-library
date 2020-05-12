let bookArray = [];

//book construcotr
function Book(title, author, numpages, editorial, readflag){
  this.title = title;
  this.author = author;
  this.numpages = numpages;
  this.editorial = editorial;
  this.readflag = readflag;
}

//append book to bookarray
Book.prototype.addBookToLibrary = function () {
  if (typeof(this.readflag) != "boolean"){
    this.readflag = (document.getElementById('BookRead').checked)? true : false;
  }
  bookArray.push(this);
  return this;
};

Book.prototype.removeBookFromLibrary = function () {
  let bookIndex = bookArray.getIndex(this);
  console.log(bookIndex);
};

//variable declared from html ids
let addbutton = document.getElementById('BookButton');
let title = document.getElementById('BookName');
let author = document.getElementById('BookAuthor');
let pages = document.getElementById('BookPages');
let editorial = document.getElementById('BookEditorial');
let read = document.getElementById('BookRead');
let fillbook = document.getElementById('TextButton');

//MozillaDev Storage availability test function
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

//Local storage test from MozillaDev
function storageTest() {
  if (storageAvailable('localStorage')) {
    console.log("YAS!");
  }
  else {
    console.log("No :(");
  }
}

//button to add elements
addbutton.onclick = function(){
  let book = new Book(title.value, author.value, pages.value, editorial.value, read.value);
  book.addBookToLibrary();
  clearForm();
  render();
  console.log(bookArray);
}

fillbook.onclick = function(){
  storageTest();
  testBooks();
  render();
  return true;
}

function clearForm(){
  title.value = "";
  author.value = "";
  pages.value = "";
  editorial.value = "";
}

function testBooks(){
  let book1 = new Book("El viejo y el mar", "Ernest Hemingway", 543, "Santillana", true);
  let book2 = new Book("El cuervo", "Edgar A. Poe", 543, "Universo", false);
  let book3 = new Book("El código Da Vinci", "Dan Brown", 543, "DeBolsillo", true);
  book1.addBookToLibrary();
  book2.addBookToLibrary();
  book3.addBookToLibrary();
}

function render(){
  const bookShelf = document.querySelector(".book-shelf");
  bookShelf.innerHTML = "";
  bookArray.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("col-lg-3", "bg-secondary", "rounded", "mx-2");

    const title = document.createElement("p");
    title.classList.add("h4", "text-center", "text-white");
    title.innerText = book.title;
    bookCard.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("h5", "text-center", "text-dark");
    author.innerText = book.author;
    bookCard.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("h6", "text-center", "text-light");
    pages.innerText = "Pages: "+book.numpages;
    bookCard.appendChild(pages);

    const editorial = document.createElement("p");
    editorial.classList.add("h6", "text-center", "text-dark");
    editorial.innerText = book.editorial;
    bookCard.appendChild(editorial);

    appendReadButton(bookCard, bookArray.indexOf(book), book.readflag);

    appendRemoveButton(bookCard, bookArray.indexOf(book));

    bookShelf.appendChild(bookCard);

  });
}

function appendReadButton(container, bookIndex, readStatus){
  const readButton = document.createElement("button");
  readButton.classList.add("read-button", "btn", "btn-primary", "text-left");
  readButton.innerText = (readStatus) ? "Read" : "Not Read";
  container.appendChild(readButton);
  readButton.onclick = function(){
    bookArray[bookIndex].readflag = !bookArray[bookIndex].readflag;
    render();
  };
}

function appendRemoveButton(container, bookIndex){
  const removeButton = document.createElement("button");
  removeButton.classList.add("read-button", "btn", "btn-danger", "text-right");
  removeButton.innerText = "Delete";
  container.appendChild(removeButton);
  removeButton.onclick = function(){
    bookArray.splice(bookIndex, 1);
    render();
  };
}
