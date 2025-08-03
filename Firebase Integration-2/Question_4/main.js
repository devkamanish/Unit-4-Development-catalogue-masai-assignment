const baseUrl = 'https://librarydb-82e30-default-rtdb.asia-southeast1.firebasedatabase.app';

let books = [];
let members = [];

let bookState = {
  filterGenre: '',
  filterAvailability: '',
  sortBy: 'title',
  page: 1,
  perPage: 5,
};

let memberState = {
  filterActive: '',
  sortBy: 'name',
  page: 1,
  perPage: 5,
};

async function fetchData() {
  try {
    const [booksRes, membersRes] = await Promise.all([
      fetch(`${baseUrl}/books.json`),
      fetch(`${baseUrl}/members.json`),
    ]);
    books = Object.values(await booksRes.json());
    members = Object.values(await membersRes.json());
    loadState();
    renderBooks();
    renderMembers();
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

// State Persistence

function saveState() {
  localStorage.setItem('bookState', JSON.stringify(bookState));
  localStorage.setItem('memberState', JSON.stringify(memberState));
}

function loadState() {
  const savedBookState = localStorage.getItem('bookState');
  if (savedBookState) bookState = JSON.parse(savedBookState);

  const savedMemberState = localStorage.getItem('memberState');
  if (savedMemberState) memberState = JSON.parse(savedMemberState);

  // Set UI controls accordingly
  document.getElementById('filter-genre').value = bookState.filterGenre;
  document.getElementById('filter-availability').value = bookState.filterAvailability;
  document.getElementById('sort-books').value = bookState.sortBy;
  document.getElementById('books-per-page').value = bookState.perPage;

  document.getElementById('filter-active').value = memberState.filterActive;
  document.getElementById('sort-members').value = memberState.sortBy;
  document.getElementById('members-per-page').value = memberState.perPage;
}

// Utils

function paginate(arr, page, perPage) {
  const start = (page - 1) * perPage;
  return arr.slice(start, start + perPage);
}

// Render Books

function renderBooks() {
  let filtered = books;

  if (bookState.filterGenre) {
    filtered = filtered.filter(b => b.genre === bookState.filterGenre);
  }

  if (bookState.filterAvailability) {
    filtered = filtered.filter(b => String(b.available) === bookState.filterAvailability);
  }

  filtered.sort((a, b) => {
    if (bookState.sortBy === 'publishedYear') {
      return a.publishedYear - b.publishedYear;
    }
    return a[bookState.sortBy].localeCompare(b[bookState.sortBy]);
  });

  const totalPages = Math.ceil(filtered.length / bookState.perPage);
  if (bookState.page > totalPages) bookState.page = totalPages || 1;

  const pageItems = paginate(filtered, bookState.page, bookState.perPage);

  const container = document.getElementById('books-list');
  container.innerHTML = '';

  pageItems.forEach(book => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} (${book.publishedYear}) - ${book.genre} - 
      ${book.available ? 'Available' : 'Not Available'}
    `;
    container.appendChild(div);
  });

  document.getElementById('books-page-info').textContent = `Page ${bookState.page} of ${totalPages || 1}`;
  saveState();
}

// Render Members

function renderMembers() {
  let filtered = members;

  if (memberState.filterActive) {
    filtered = filtered.filter(m => String(m.active) === memberState.filterActive);
  }

  filtered.sort((a, b) => {
    if (memberState.sortBy === 'membershipDate') {
      return new Date(a.membershipDate) - new Date(b.membershipDate);
    }
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(filtered.length / memberState.perPage);
  if (memberState.page > totalPages) memberState.page = totalPages || 1;

  const pageItems = paginate(filtered, memberState.page, memberState.perPage);

  const container = document.getElementById('members-list');
  container.innerHTML = '';

  pageItems.forEach(member => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <strong>${member.name}</strong> - Joined: ${member.membershipDate} - 
      ${member.active ? 'Active' : 'Inactive'}
    `;
    container.appendChild(div);
  });

  document.getElementById('members-page-info').textContent = `Page ${memberState.page} of ${totalPages || 1}`;
  saveState();
}

// Event Listeners

document.getElementById('filter-genre').addEventListener('change', e => {
  bookState.filterGenre = e.target.value;
  bookState.page = 1;
  renderBooks();
});

document.getElementById('filter-availability').addEventListener('change', e => {
  bookState.filterAvailability = e.target.value;
  bookState.page = 1;
  renderBooks();
});

document.getElementById('sort-books').addEventListener('change', e => {
  bookState.sortBy = e.target.value;
  renderBooks();
});

document.getElementById('books-per-page').addEventListener('change', e => {
  bookState.perPage = +e.target.value;
  bookState.page = 1;
  renderBooks();
});

document.getElementById('books-prev').addEventListener('click', () => {
  if (bookState.page > 1) {
    bookState.page--;
    renderBooks();
  }
});

document.getElementById('books-next').addEventListener('click', () => {
  const totalPages = Math.ceil(books.length / bookState.perPage);
  if (bookState.page < totalPages) {
    bookState.page++;
    renderBooks();
  }
});

document.getElementById('filter-active').addEventListener('change', e => {
  memberState.filterActive = e.target.value;
  memberState.page = 1;
  renderMembers();
});

document.getElementById('sort-members').addEventListener('change', e => {
  memberState.sortBy = e.target.value;
  renderMembers();
});

document.getElementById('members-per-page').addEventListener('change', e => {
  memberState.perPage = +e.target.value;
  memberState.page = 1;
  renderMembers();
});

document.getElementById('members-prev').addEventListener('click', () => {
  if (memberState.page > 1) {
    memberState.page--;
    renderMembers();
  }
});

document.getElementById('members-next').addEventListener('click', () => {
  const totalPages = Math.ceil(members.length / memberState.perPage);
  if (memberState.page < totalPages) {
    memberState.page++;
    renderMembers();
  }
});

// Init

fetchData();
