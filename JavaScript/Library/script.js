const myLibrary = [];

function book(id, title, author, pageNumbers, haveRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pageNumbers = pageNumbers;
    this.haveRead = haveRead;
    function info(){
        return `${this.title} by ${this.author}, ${this.pageNumbers} pages, ${this.haveRead?"Read":"not read yet"}`;
    }
};

function addBookToLibrary(title, author, pageNumbers, haveRead){
    let newBook = new book(crypto.randomUUID(), title, author, pageNumbers, haveRead);
    myLibrary.push(newBook);
}

(function populateBook(){
    addBookToLibrary("The Hobbit", "J.R.R Tolkien", 285, false);
    addBookToLibrary("Cell", "Stephen King", 449, true);
})();

function displayBooks(){
    const bookListDomEle = document.getElementsByClassName("childcontainercontent")
    myLibrary.forEach(element => {
        let headerElement = createButtons()
        console.log(headerElement.outerHTML)
        let libraryInfo = document.createElement("div");
        libraryInfo.className = "libraryBookInfo";
        libraryInfo.innerHTML = `${createButtons().outerHTML} </br><p>${element.title}</p><p>${element.author}</p></br><p>${element.pageNumbers}</p></br><p>${element.haveRead}</p></br>`
        bookListDomEle.item(0).appendChild(libraryInfo);
    });
    
}

function createButtons(){
    let libraryInfoEdit = document.createElement("button");
    libraryInfoEdit.value = "Edit";
    libraryInfoEdit.textContent = "Edit";
    let libraryInfoDelete = document.createElement("button");
    libraryInfoDelete.value = "Delete";
    libraryInfoDelete.textContent = "Delete";
    let headerContainer = document.createElement("div")
    headerContainer.className = "cardHeader";
    headerContainer.appendChild(libraryInfoEdit);
    headerContainer.appendChild(libraryInfoDelete);
    return headerContainer;
}


displayBooks();