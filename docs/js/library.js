function UI() {
  this.addBookBtn = document.querySelector('[data-addBookBtn]');
  this.clearBtn = document.querySelector('[data-clearBtn]');
  this.cancelBtn = document.querySelector('[data-cancelBtn]');

  this.form = document.querySelector('[data-form]');
  this.modal = document.querySelector('[data-modal]');
  this.overlay = document.querySelector('[data-overlay]');
  this.bookList = document.querySelector('[data-bookList]');

  this.titleInput = document.querySelector('[data-titleInput]');
  this.authorInput = document.querySelector('[data-authorInput]');
  this.radioDone = document.querySelector('[data-radioDone]');
  this.radioProgress = document.querySelector('[data-radioProgress]');
  this.radioNull = document.querySelector('[data-radioNull]');
}

UI.prototype.openModal = function openModal() {
  this.modal.classList.add('active');
  this.overlay.classList.add('active');
};

UI.prototype.closeModal = function closeModal() {
  this.modal.classList.remove('active');
  this.overlay.classList.remove('active');
};

UI.prototype.addBook = function addBook(book) {
  const output = `
           <li>${book.title}</li>
           <li>${book.author}</li>
           <li>
              <button class="booklist-status-btn ${book.btnClass}">${book.status}</button>
           </li>
           <li>
              <a href="#"><i class="fas fa-trash delete-btn data-deleteBtn"></i></a>
           </li>
    `;

  this.bookList.innerHTML += output;
};

UI.prototype.getStatus = function getStatus() {
  if (this.radioDone.checked) {
    return ['Finished', 'status-btn-done'];
  }

  if (this.radioProgress.checked) {
    return ['In Progress', 'status-btn-progress'];
  }

  return ['Not Started', 'status-btn-null'];
};

UI.prototype.deleteBook = function deleteBook(
  element1,
  element2,
  element3,
  element4
) {
  element1.remove();
  element2.remove();
  element3.remove();
  element4.remove();
};

UI.prototype.changeStatus = function changeStatus(statusElement) {
  if (statusElement.classList.contains('status-btn-done')) {
    statusElement.classList.remove('status-btn-done');
    statusElement.classList.add('status-btn-progress');
    const temp = statusElement;
    temp.textContent = 'In Progress';
    return;
  }

  if (statusElement.classList.contains('status-btn-progress')) {
    statusElement.classList.remove('status-btn-progress');
    statusElement.classList.add('status-btn-null');
    const temp = statusElement;
    temp.textContent = 'Not Started';
    return;
  }

  if (statusElement.classList.contains('status-btn-null')) {
    statusElement.classList.remove('status-btn-null');
    statusElement.classList.add('status-btn-done');
    const temp = statusElement;
    temp.textContent = 'Finished';
  }
};

UI.prototype.clearInput = function clearInput() {
  this.titleInput.value = '';
  this.authorInput.value = '';
  this.radioDone.checked = false;
  this.radioProgress.checked = false;
  this.radioNull.checked = false;
};

UI.prototype.clearAll = function clearAll() {
  this.bookList.innerHTML = `
    <li class="ul-heading">Title</li>
    <li class="ul-heading">Author</li>
    <li class="ul-heading">Status</li>
    <li></li>
    `;
};

function Book(title, author, status, btnClass) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.btnClass = btnClass;
}

function BookList() {
  this.data = [];
}

BookList.prototype.add = function add(book) {
  const temp = {
    title: book.title,
    author: book.author,
  };
  this.data.push(temp);
};

BookList.prototype.remove = function remove(bookToBeDeleted) {
  this.data.forEach((book, index) => {
    if (
      book.title === bookToBeDeleted.title &&
      book.author === bookToBeDeleted.author
    ) {
      this.data.splice(index, 1);
    }
  });
};

BookList.prototype.isInData = function isInData(bookToAdd) {
  let alreadyInList = false;
  this.data.forEach((book) => {
    if (book.title === bookToAdd.title && book.author === bookToAdd.author) {
      alreadyInList = true;
    }
  });

  if (alreadyInList) {
    return true;
  }

  return false;
};

function LocStorage() {
  this.storage = [];
}

LocStorage.prototype.add = function add(book) {
  if (localStorage.getItem('bookList')) {
    this.storage = JSON.parse(localStorage.getItem('bookList'));
  }

  this.storage.push(book);

  localStorage.setItem('bookList', JSON.stringify(this.storage));
};

LocStorage.prototype.remove = function remove(bookToBeDeleted) {
  this.storage = JSON.parse(localStorage.getItem('bookList'));
  this.storage.forEach((book, index) => {
    if (
      book.title === bookToBeDeleted.title &&
      book.author === bookToBeDeleted.author
    ) {
      this.storage.splice(index, 1);
    }
  });

  localStorage.setItem('bookList', JSON.stringify(this.storage));
};

LocStorage.prototype.editStatus = function editStatus(bookToBeEdited) {
  this.storage = JSON.parse(localStorage.getItem('bookList'));
  this.storage.forEach((book) => {
    if (
      book.title === bookToBeEdited.title &&
      book.author === bookToBeEdited.author
    ) {
      const temp = book;
      temp.status = bookToBeEdited.status;
      temp.btnClass = bookToBeEdited.btnClass;
    }
  });

  localStorage.setItem('bookList', JSON.stringify(this.storage));
};

LocStorage.prototype.clearAll = function clearAll() {
  localStorage.clear('bookList');
};

export { UI, Book, BookList, LocStorage };
