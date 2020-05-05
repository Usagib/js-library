let bookArray = [];

function Book(title, author, numpages, editorial, readflag){
  this.title = title;
  this.author = author;
  this.numpages = numpages;
  this.editorial = editorial;
  this.readflag = readflag;
}

Book.prototype.addBookToLibrary = function () {
  bookArray.push(this);
  return this;
};
