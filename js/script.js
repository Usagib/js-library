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
  this.readflag = (document.getElementById('BookRead').checked)? true : false;
  bookArray.push(this);
  return this;
};

//variable declared from html ids
let addbutton = document.getElementById('BookButton');
let title = document.getElementById('BookName');
let author = document.getElementById('BookAuthor');
let pages = document.getElementById('BookPages');
let editorial = document.getElementById('BookEditorial');
let read = document.getElementById('BookRead');
let ul = document.getElementById('BookList');

//button to add elements
addbutton.onclick = function(){
  let book = new Book(title.value, author.value, pages.value, editorial.value, read.value);
  book.addBookToLibrary();
  clearForm();
  render();
  console.log(bookArray);
}

function clearForm(){
  title.value = "";
  author.value = "";
  pages.value = "";
  editorial.value = "";
}

function render(){
  for (let i=0; i < bookArray.length; i++){
    console.log(bookArray[i].title);
    ul.innerHTML +=
    `<li>
      <h5>book: ${bookArray[i].title}</h5>
      <h6>author: ${bookArray[i].author}</h6>
      <p>pages: ${bookArray[i].pages}
      editorial: ${bookArray[i].editorial}</p>
      <h5>have i read this book?: ${read}</h5>
    </li>`
  }
}
