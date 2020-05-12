let bookArray = [];

function Book(title, author, numpages, editorial, readflag){
  this.title = title;
  this.author = author;
  this.numpages = numpages;
  this.editorial = editorial;
  this.readflag = readflag;
}

Book.prototype.addBookToLibrary = function () {
  if(typeof(this.readflag) != "boolean"){
    this.readflag = (document.getElementById('BookRead').checked) ? true : false;
  }
  bookArray.push(this);
  return this;
};

function testAdding(){
  let testbook1 = new Book ("Book title", "book Author", 1000, "Debolsillo", true)
  testbook1.addBookToLibrary();
  return bookArray;
}

let testbtn = document.getElementById('TestButton');

testbtn.onclick = function() {
  console.log(testAdding());
}
