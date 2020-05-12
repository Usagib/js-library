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
  console.log(addStatus);
  console.log(myLibrary);
  render();
}

// var row = document.getElementById("myRow");
// var x = row.insertCell(0);
// x.innerHTML = "New cell";

  function render(){
    const table = document.getElementById('lib-table');
    table.innerHTML = "";
    let index = 1;
    myLibrary.forEach((book) => {
      let tableRow = table.insertRow();
      let indexCol = document.createElement('th');
      indexCol.innerHTML = index;
      index++;
      tableRow.appendChild(indexCol);

      let titleCol = tableRow.insertCell(1);
      titleCol.innerHTML = book.title;

      let authorCol = tableRow.insertCell(2);
      authorCol.innerHTML = book.author;

      let pagesCol = tableRow.insertCell(3);
      pagesCol.innerHTML = book.numpages;

      let editorCol = tableRow.insertCell(4);
      editorCol.innerHTML = book.editorial;

      let readCol = tableRow.insertCell(5);
      let readButton = document.createElement('button');
      readButton.innerText = (book.readflag) ? "Read" : "Reading";
      readButton.classList.add("btn", "btn-outline-info");
      readButton.onclick = function(){
        book.readflag = !book.readflag;
        readButton.classList.remove("btn-outline-info");
        readButton.classList.add("btn-outline-success");
      };
      readCol.appendChild(readButton);

      let removeCol = tableRow.insertCell(6);
      let removeButton = document.createElement('button');
      removeButton.innerText = "remove";
      removeButton.classList.add("btn", "btn-danger");
      readButton.onclick = function(){
        myLibrary.splice(indexOf(book), 1);
      };
      removeCol.appendChild(removeButton);

    });

  }
//function testAdding(){
//  let testbook1 = new Book ("Book title", "book Author", 1000, "Debolsillo", true)
//  testbook1.addBookToLibrary();
//  return bookArray;
//}
