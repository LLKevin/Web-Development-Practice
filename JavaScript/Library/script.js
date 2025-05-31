
//Observer Pattern 
class EventBus{
    constructor(){
        if(EventBus.instance){
            return EventBus.instance;
        }
        this.listeners = {};
        EventBus.instance = this;
    }
    // listens for data changes
    on(event, callback){
        if(!this.listeners[event]){
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    // removes the event from the call stack
    off(event, callback){
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback);
        }
    }
    // Request to do something
    emit(event, data){
        if(this.listeners[event]){
            this.listeners[event].forEach((listener) => listener(data));
        }
    }
}

class HtmlController {
    constructor(eventBus){
        this.eventBus = eventBus;
        // properly handle click events in a class
        this.dialog = document.querySelector('dialog');
        this.eventBus.on("LibraryUpdated", this.displayBooks)

        this.eventBus.on("changeBookStatus", this.changeBookStatus);

        this.dialogClose =  document.getElementsByClassName('dialogClose').item(0);
        this.dialogCloseHandler =  this.closeModal.bind(this);
        this.dialogClose.addEventListener('click', this.dialogCloseHandler);

        this.bookForm =  document.getElementsByClassName('bookForm')[0]; //document.getElementsByClassName('bookForm');
        this.bookForm.addEventListener('submit', this.submitForm);

        this.modelBtn = document.getElementsByClassName('modelBtn').item(0);
        this.showModalHandleClick = this.showModal.bind(this);
        this.modelBtn.addEventListener('click', this.showModalHandleClick);

        this.bookListContainer = document.getElementsByClassName("childcontainercontent")[0];
        this.bookListContainer.addEventListener('click', this.handleCardClick);

    }

    closeModal = () =>{
        this.dialog.close();
    }
    showModal = () =>{
        this.dialog.showModal()
    }

    displayBooks = (libraryData) =>{
        if (!this.bookListContainer) return;

        this.bookListContainer.innerHTML = ''; // Clear existing

        libraryData.forEach(book => {
            const libraryInfo = document.createElement("div");
            libraryInfo.className = "libraryBookInfo";
            libraryInfo.dataset.attribute = book.id;

            const buttonsContainer = this.createButtons();

            libraryInfo.innerHTML = `
                <p class='title'>Title: ${book.title}</p>
                <p class='author'>Author: ${book.author}</p>
                <p class='pageNumbers'>Pages: ${book.pageNumbers}</p>
                <p class='haveRead'>Read: ${book.haveRead}</p>
            `;
            libraryInfo.prepend(buttonsContainer);
            this.bookListContainer.appendChild(libraryInfo);
        });
    }

    createButtons(){
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

    submitForm = (event) => {
        event.preventDefault();
        let formElements =  event.target.elements;
        let title  = formElements[0].value;
        let author = formElements[1].value;
        let numOfPages=formElements[2].value;
        let isRead = formElements[3].checked;
        this.eventBus.emit("addBookRequested", {title, author, pageNumbers: numOfPages, haveRead:isRead })
       //this.displayBooks(this.library.length - 1);
        this.bookForm.reset()    
        this.dialog.close();
    }

    handleCardClick = (event) => {
        const target = event.target;
        const bookCard = event.target.closest('.libraryBookInfo');
        if(bookCard){
            const bookId = bookCard.dataset.attribute;
            if(target.classList.contains('changeStatus')){
                this.eventBus.emit("updateStatus", bookId);
            } else if (target.classList.contains('InfoDelete')){
                this.eventBus.emit("deleteBook", bookId);
            }
        }
    }
}

class Book {
    constructor(id, title, author, pageNumbers, haveRead){
        this.id =  id;
        this.title = title;
        this.author = author;
        this.pageNumbers = pageNumbers;
        this.haveRead = haveRead;
    }

    info(){
        return `${this.title} by ${this.author}, ${this.pageNumbers} pages, ${this.haveRead?"Read":"not read yet"}`;
    }
}

class Library {
    library = []
    constructor(eventBus){
        this.eventBus = eventBus;
        // watches for this event to occur
        this.eventBus.on("addBookRequested", this.addBookToLibrary); 
        this.eventBus.on("updateStatus", this .updateBookStatus);
        this.eventBus.on("deleteBook", this.deleteBook);

        this.populateBooks();
        this.emitLibraryUpdate(); // initial render
    }
    //Update book status
    updateBookStatus = (bookid) => {
        const book = this.library.find((item) => item.id === bookid);
        if(book){
            book.haveRead = !book.haveRead;
        }
        this.emitLibraryUpdate();
    }    
    deleteBook = (bookid) => {
        const updatedLibraryList = this.library.filter((item) => item.id !== bookid);
        // update library with the book list
        this.library = updatedLibraryList;
        this.emitLibraryUpdate();
    }
    emitLibraryUpdate(){
        this.eventBus.emit("LibraryUpdated", [...this.library]);
    }
    addBookToLibrary = (bookData) => {
        this.book = new Book(
            crypto.randomUUID(),
            bookData.title, 
            bookData.author, 
            bookData.pageNumbers,
            bookData.haveRead);
        this.library.push(this.book);
        this.emitLibraryUpdate();
    }
    populateBooks(){
        this.addBookToLibrary({title:"The Hobbit", author:"J.R.R Tolkien", pageNumbers:285, haveRead:false});
        this.addBookToLibrary({title:"Cell", author:"Stephen King", pageNumbers:449, haveRead:true});
        this.addBookToLibrary({title:"Twilight", author:"Stephanie Meyer", pageNumbers:350, haveRead:false});
        this.addBookToLibrary({title:"Twilight", author:"Stephanie Meyer", pageNumbers:350, haveRead:false});
    }
}

//let bookForm = document.getElementsByClassName('bookForm');
const eventBus = new EventBus();
const htmlController = new HtmlController(eventBus);
const library = new Library(eventBus);

