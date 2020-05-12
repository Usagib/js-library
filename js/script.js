let index = 0;
let myLibrary = [];

function Book(title, author, numpages, editorial, readflag){
  this.title = title;
  this.author = author;
  this.numpages = numpages;
  this.editorial = editorial;
  this.readflag = readflag;
}

// Book.prototype.addBookToLibrary = function () {};

function addBookToLibrary(){
  let addTitle = document.getElementById("new-title").value;
  let addAuthor = document.getElementById("new-author").value;
  let addPages = document.getElementById("new-pages").value;
  let addEditorial = document.getElementById('new-editorial').value;
  let radios = document.getElementsByName("new-read");
  radios.forEach(function (radio) {
    if (radio.checked) addStatus = radio.value;
  });
  let newBook = new Book(addTitle, addAuthor, addPages, addEditorial, addStatus);
  myLibrary.push(newBook);
  //console.log(addStatus);
  //console.log(myLibrary);
  saveLocalAndRender();
}

// var row = document.getElementById("myRow");
// var x = row.insertCell(0);
// x.innerHTML = "New cell";

function render(books){
  const table = document.getElementById('lib-table');
  table.innerHTML = "";
  let index = 1;

  while (index < books.length) {
      console.log(myLibrary);

      let tableRow = table.insertRow();
      let indexCol = document.createElement('th');
      indexCol.innerHTML = index;
      index++;
      tableRow.appendChild(indexCol);

      let titleCol = tableRow.insertCell(1);
      titleCol.innerHTML = books[index].title;

      let authorCol = tableRow.insertCell(2);
      authorCol.innerHTML = books[index].author;

      let pagesCol = tableRow.insertCell(3);
      pagesCol.innerHTML = books[index].numpages;

      let editorCol = tableRow.insertCell(4);
      editorCol.innerHTML = books[index].editorial;

      // status btn
      let readCol = tableRow.insertCell(5);
      let readButton = document.createElement('button');
      readButton.innerText = (book.readflag) ? "read" : "reading";
      //readButton.classList.add("btn", "btn-outline-info");
      readButton.setAttribute("class", "btn btn-outline-info");

      readButton.addEventListener("click", function () {
        book.readflag = !book.readflag;
        readButton.setAttribute("class", "btn-outline-success");
      });

      //readButton.onclick = function(){
        //book.readflag = !book.readflag;
        //readButton.classList.remove("btn-outline-info");
        //readButton.classList.add("btn-outline-success");
        //readButton.setAttribute("class", "btn-outline-success");
      //};

      readCol.appendChild(readButton);
      console.log(myLibrary);

      // remove btn
      //let removeCol = tableRow.insertCell(6);
      //let removeButton = document.createElement('button');
      //removeButton.innerText = "remove";
      //removeButton.classList.add("btn", "btn-danger");
      //removeButton.onclick = function(){
      //  myLibrary.splice(myLibrary.indexOf(book), 1);
      //};
      //removeCol.appendChild(removeButton);
  }
//function testAdding(){
//  let testbook1 = new Book ("Book title", "book Author", 1000, "Debolsillo", true)
//  testbook1.addBookToLibrary();
//  return bookArray;
//}
}

// save to local storage and render lib
function saveLocalAndRender() {
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
  render(myLibrary);
}

// populateBooks
function populateBooks() {
  myLibrary.push(new Book("book01", "author01", 11, true));
  myLibrary.push(new Book("book02", "author02", 22, false));
  myLibrary.push(new Book("book03", "author03", 33, true));
}