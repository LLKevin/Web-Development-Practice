let myLibrary = [];
let modelBtn = document.getElementsByClassName('modelBtn').item(0);
let dialog = document.querySelector('dialog');
let bookForm = document.getElementsByClassName('bookForm');

modelBtn.addEventListener("click", ()=>{
    dialog.showModal();
});

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
    addBookToLibrary("Twilight", "Stephanie Meyer", 350, false);
    addBookToLibrary("Twilight", "Stephanie Meyer", 350, false);

})();

function displayBooks(){
    const bookListDomEle = document.getElementsByClassName("childcontainercontent")
    myLibrary.forEach(element => {
        let libraryInfo = document.createElement("div");
        libraryInfo.className = "libraryBookInfo";
        // The event listener going to the parent event and filtered after.
        libraryInfo.addEventListener("click", (e) =>{
            let targetElementAttribute = e.target.parentNode.parentElement.dataset.attribute;
            if(e.target.className === "InfoDelete"){
                e.target.parentNode.parentElement.parentElement.removeChild(e.target.parentNode.parentElement)
                myLibrary = myLibrary.filter((item) => item.id != targetElementAttribute); 
            }
            if(e.target.className === "changeStatus"){
                let statusElement = e.target.parentElement.parentElement.childNodes[5].textContent;
                let currentStatus =  statusElement === "true";
                let newStatusBool = !currentStatus;

                //The default value will be fault if the page is refreshed.
                myLibrary.find(item => item.id === targetElementAttribute).haveRead = newStatusBool;
                console.log(myLibrary)


                e.target.parentElement.parentElement.childNodes.forEach((x) =>{
                    if(x.className === "haveRead"){
                        x.textContent = newStatusBool;
                    }
                });
            }
        });

        libraryInfo.setAttribute(`data-attribute`, element.id);
        libraryInfo.innerHTML = `${createButtons().outerHTML} <p class='title'>${element.title}</p><p class='author'>${element.author}</p><p class='pageNumbers'>${element.pageNumbers}</p><p class='haveRead'>${element.haveRead}</p>`
        bookListDomEle.item(0).appendChild(libraryInfo);
    });
}

function createButtons(){
    let libraryInfoEdit = document.createElement("button");
    libraryInfoEdit.value = "changeStatus";
    libraryInfoEdit.textContent = "Change Status";
    libraryInfoEdit.className = "changeStatus";

    let libraryInfoDelete = document.createElement("button");
    libraryInfoDelete.value = "Delete";
    libraryInfoDelete.textContent = "Delete";
    libraryInfoDelete.className = "InfoDelete";
  
    let headerContainer = document.createElement("div")
    headerContainer.className = "cardHeader";
    headerContainer.appendChild(libraryInfoEdit);
    headerContainer.appendChild(libraryInfoDelete);
    return headerContainer;
}

displayBooks();