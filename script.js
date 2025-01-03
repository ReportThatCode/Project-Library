const myLibrary = [];

function Book(name,author,pages,isRead) {
  // the constructor...
  this.name = name,
  this.author = author,
  this.pages = pages,
  this.isRead = isRead;
}



const caperusita = new Book('Caperucita Roja','Anonimo', 10, true);

console.log(caperusita)

function addBookToLibrary() {
  // do stuff here
}




function generarIdUnico() {
  const id = Date.now() - Math.floor(Math.random() * 1000000)
  return id.toString().slice(-5);
}