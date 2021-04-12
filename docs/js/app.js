import { UI, Book, BookList, LocStorage } from './library.js';

const ui = new UI();
const bookList = new BookList();
const locStorage = new LocStorage();

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('bookList')) {
    locStorage.storage = JSON.parse(localStorage.getItem('bookList'));
    locStorage.storage.forEach((book) => {
      ui.addBook(book);

      const temp = {
        title: book.title,
        author: book.author,
      };
      bookList.add(temp);
    });
  }
});

// Open Modal
ui.addBookBtn.addEventListener('click', (e) => {
  ui.openModal();
  e.preventDefault();
});

ui.clearBtn.addEventListener('click', (e) => {
  ui.clearAll();
  locStorage.clearAll();
  bookList.data = [];
  e.preventDefault();
});

// Add Book on UI
ui.form.addEventListener('submit', (e) => {
  const title = ui.titleInput.value;
  const author = ui.authorInput.value;
  const [status, btnClass] = ui.getStatus();

  const book = new Book(title, author, status, btnClass);

  if (bookList.isInData(book)) {
    alert('Book is already in the list.');
    e.preventDefault();
    return;
  }

  bookList.add(book);
  ui.addBook(book);
  locStorage.add(book);

  ui.closeModal();
  ui.clearInput();

  e.preventDefault();
});

// Close Modal thru button
ui.cancelBtn.addEventListener('click', (e) => {
  ui.closeModal();
  e.preventDefault();
});

// Delete Book Button
ui.bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('data-deleteBtn')) {
    const title =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;
    const author =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.textContent;
    const bookToBeDeleted = new Book(title, author);

    locStorage.remove(bookToBeDeleted);
    bookList.remove(bookToBeDeleted);

    const element1 = e.target.parentElement.parentElement;
    const element2 =
      e.target.parentElement.parentElement.previousElementSibling;
    const element3 =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling;
    const element4 =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling;
    ui.deleteBook(element1, element2, element3, element4);
  }
  e.preventDefault();
});

// Change Book Status
ui.bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('booklist-status-btn')) {
    ui.changeStatus(e.target);

    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const author = e.target.parentElement.previousElementSibling.textContent;
    const status = e.target.textContent;
    let btnClass;

    if (e.target.classList.contains('status-btn-done')) {
      btnClass = 'status-btn-done';
    }

    if (e.target.classList.contains('status-btn-progress')) {
      btnClass = 'status-btn-progress';
    }

    if (e.target.classList.contains('status-btn-null')) {
      btnClass = 'status-btn-null';
    }

    const bookToEditStatus = new Book(title, author, status, btnClass);

    locStorage.editStatus(bookToEditStatus);
  }
  e.preventDefault();
});

// Close Modal thru overlay
ui.overlay.addEventListener('click', () => {
  ui.closeModal();
});
