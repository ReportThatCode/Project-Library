const $inputPages = document.querySelector("#pages");

const inputRead = document.getElementById("Read");
const inputNoRead = document.getElementById("noRead");

const templateTable = document.getElementById("table-row").content;

const booksRecommend = {
  fantasy: [
    { name: "The Name of the Wind", author: "Patrick Rothfuss", pages: 872 },
    { name: "The Fellowship of the Ring", author: "J.R.R. Tolkien", pages: 576 },
    { name: "A Game of Thrones", author: "George R.R. Martin", pages: 694 },
    { name: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", pages: 256 },
  ],
  selfHelp: [
    { name: "How to Make Good Things Happen", author: "Marian Rojas Estapé", pages: 232 },
    { name: "Secrets of the Millionaire Mind", author: "T. Harv Eker", pages: 176 },
    { name: "The Monk Who Sold His Ferrari", author: "Robin Sharma", pages: 208 },
    { name: "Atomic Habits", author: "James Clear", pages: 320 },
    { name: "Unf*ck Your Boundaries", author: "Dr. Faith G. Harper", pages: 666 }
  ],
  stories: [
    { name: "One Hundred Years of Solitude", author: "Gabriel García Márquez", pages: 496 },
    { name: "The Shadow of the Wind", author: "Carlos Ruiz Zafón", pages: 576 },
    { name: "Love in the Time of Cholera", author: "Gabriel García Márquez", pages: 368 },
    { name: "The House of the Spirits", author: "Isabel Allende", pages: 448 },
  ],
  scienceFiction: [
    { name: "Foundation", author: "Isaac Asimov", pages: 256 },
    { name: "1984", author: "George Orwell", pages: 328 },
    { name: "Brave New World", author: "Aldous Huxley", pages: 256 },
    { name: "Neuromancer", author: "William Gibson", pages: 320 },
    { name: "The End of Eternity", author: "Isaac Asimov", pages: 666 }
  ],
  novels: [
    { name: "Don Quixote", author: "Miguel de Cervantes", pages: 1072 },
    { name: "Pride and Prejudice", author: "Jane Austen", pages: 416 },
    { name: "Crime and Punishment", author: "Fyodor Dostoevsky", pages: 671 },
    { name: "Wuthering Heights", author: "Emily Brontë", pages: 416 },
  ]
};


let myLibrary = [];

function Book(id,name,author,pages,isRead) {
  // the constructor...
  this.id = id,
  this.name = name,
  this.author = author,
  this.pages = pages,
  this.isRead = isRead;

}

myLibrary.push(new Book(generarIdUnico(),"The Hobbit","J.R.R. Tolkien",295,"READ"))
myLibrary.push(new Book(generarIdUnico(),"The Lord of the Rings","J.R.R. Tolkien",1178,"NOT READ"))
myLibrary.push(new Book(generarIdUnico(),"The Silmarillion","J.R.R. Tolkien",365,"READ"))
myLibrary.push(new Book(generarIdUnico(),"The Children of Húrin","J.R.R. Tolkien",313,"NOT READ"))

actualizarTabla()
console.log(myLibrary);
function addBookToLibrary(obj) {
  // do stuff here
  const {title,author,pages,isRead} = obj

  const book = new Book(generarIdUnico(),title,author,pages,isRead)
  myLibrary.push(book)
  actualizarTabla()
  return console.log(myLibrary)
}

function actualizarTabla(){

  document.querySelector(".tbody-books").innerHTML = ""
  
  myLibrary.forEach(book => {
    const clone = templateTable.cloneNode(true);
    clone.querySelector(".title").textContent = book.name;
    clone.querySelector(".author").textContent = book.author;
    clone.querySelector(".pages").textContent = book.pages;
    clone.querySelector(".isRead").textContent = book.isRead;
    clone.querySelector(".edit").dataset.id = book.id;
    clone.querySelector(".delete").dataset.id = book.id;

    document.querySelector(".tbody-books").appendChild(clone)
  })
  
}


function generarIdUnico() {
  const id = Date.now() - Math.floor(Math.random() * 1000000)
  return id.toString().slice(-5);
}

function removeActive(){
  document.querySelectorAll(".active").forEach((el)=>{
    el.classList.remove("active")
  })
}

function showBooks(genero = "fantasy"){
  const templateRow = document.querySelector(".table-row-recommended").content;
  document.querySelector(".tbody-recommended").innerHTML = ""
  booksRecommend[genero].forEach((book) => {

    const clone = templateRow.cloneNode(true);
    clone.querySelector(".recommend-title").textContent = book.name;
    clone.querySelector(".recommend-author").textContent = book.author;
    clone.querySelector(".recommend-pages").textContent = book.pages;
    document.querySelector(".tbody-recommended").appendChild(clone)
  })
}
showBooks();

document.querySelector("form").addEventListener("submit",(e)=>{
  e.preventDefault();
  const idEdit = document.getElementById("btn-submit").dataset.id;

  if(idEdit != 0 || idEdit != "0") {
    index = myLibrary.findIndex(book => book.id === idEdit)
    myLibrary[index].name = document.getElementById("title").value;
    myLibrary[index].author = document.getElementById("author").value;
    myLibrary[index].pages = document.getElementById("pages").value;  
    myLibrary[index].isRead = document.querySelector('input[name="isRead"]:checked').value;
    actualizarTabla();
    document.querySelector("form").reset();
    removeActive();
    document.querySelector("#noRead").previousElementSibling.classList.add("active")
    document.querySelector("#noRead").checked = true
    document.getElementById("btn-submit").dataset.id = 0;
    return 
  }
  else {

  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const isRead = document.querySelector('input[name="isRead"]:checked').value;
  document.querySelector("form").reset();
  removeActive();
  document.querySelector("#noRead").previousElementSibling.classList.add("active")
  document.querySelector("#noRead").checked = true
  document.getElementById("btn-submit").dataset.id = 0;
  return addBookToLibrary({title,author,pages,isRead})
  }

})



document.addEventListener("click",(e)=>{

  if(e.target.matches(".delete")){
    const id = e.target.dataset.id;
    myLibrary = myLibrary.filter(book => book.id !== id);
    return actualizarTabla();
  }

  if(e.target.matches(".edit")){
    const id = e.target.dataset.id;
    const book = myLibrary.find(book => book.id === id)

    document.getElementById("title").value = book.name;
    document.getElementById("author").value = book.author;
    document.getElementById("pages").value = book.pages;
    
    removeActive();
    if(book.isRead === "READ"){
      document.querySelector("#Read").previousElementSibling.classList.add("active")
      document.querySelector("#Read").checked = true
    }
 
    if(book.isRead === "NOT READ"){
    document.querySelector("#noRead").previousElementSibling.classList.add("active")
    document.querySelector("#noRead").checked = true
    }

    document.getElementById("btn-submit").dataset.id = id;
  }


  if(e.target.matches(".mas")) {
    e.preventDefault();
    $inputPages.value = parseInt($inputPages.value) + 1;
  }
  if(e.target.matches(".menos")) {
    e.preventDefault();
    if($inputPages.value === "0") return
    $inputPages.value = parseInt($inputPages.value) - 1;
  }
})



document.addEventListener("input",(e)=>{

  if(e.target.matches("#generos")){
    showBooks(document.querySelector("#generos").value)
  }

  if(inputNoRead.checked){
    removeActive()
    inputNoRead.previousElementSibling.classList.add("active")
  }
  if(inputRead.checked){
    removeActive()
    inputRead.previousElementSibling.classList.add("active")
  }
})