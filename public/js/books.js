import {books} from './booksList.js';
// let books;
const input = document.querySelector('input#search');

// fetch data
async function fetchBooks ( query ) {
    try {
        const data_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        const response = await fetch(data_url);
        return await response.json();
      } catch (error) {
        console.log("fetch books error -> ", error);
      }
}

// submit search
document.querySelector('#search').addEventListener('submit', (event) => {
    event.preventDefault();
    fetchBooks(input.value)
    .then(books => {
        books = books.items;
        // console.log(books);
        render_books(books);
    });
})


// render
function render_books( books = []) {
    console.log(books);
    document.querySelector('.booksWrapper').innerHTML = books.map(render_book).join("") 
}

function render_book(book = {}) {
    return `<div class='book'>
    <div class='imgWrapper'><img class='image' src=${book.volumeInfo.imageLinks.thumbnail || ''}></div>
    <h3 class='title' ><a href="${book.volumeInfo.infoLink}" target="_blank" >${book.volumeInfo.title}</a></h3>
    <p class='description'> ${book.volumeInfo.description || ""}</p>
</div>`;
}

render_books(books);



