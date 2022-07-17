// import {books} from './booksList.js';
let books = [];

const input = document.querySelector('input#search');
const searchByAuthor = document.querySelector('input#searchByAuthor');
const btnSortByDate = document.querySelector('p#sortByDate');
const btnsortByPages = document.querySelector('p#sortByPages');


// fetch data
async function fetchBooks ( query ) {
    try {
        console.log(searchByAuthor.value);
        let data_url;
        if (searchByAuthor.checked == "true" ) {
            data_url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}`
        } else {
            data_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        }
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
    .then(data => {
        books = data.items;
        // console.log(books);
        renderBooks(books);
    });
})

// --------------------------------------- render ---------------------------------------------
// render books
const renderBooks = ( books = []) => {
    console.log(books);
    document.querySelector('.booksWrapper').innerHTML = books.map(renderBook).join("") 
}

// render  one book
const renderBook = (book = {}) =>  {
    try {
        return `<div class='book' id=${book.id} published=${book.volumeInfo.publishedDate?.slice(0,4) || 0} pages=${book.volumeInfo.pageCount || 0}>
        <a href="${book.volumeInfo.infoLink}" target="_blank">
            <div class='imgWrapper'><img class='image' src=${book.volumeInfo.imageLinks?.thumbnail? book.volumeInfo.imageLinks.thumbnail : 'https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/2.png?alt=media&token=c67fdcbc-db88-4ab8-b3b7-e8c703603779'}></div>
            <h3 class='title' > ${book.volumeInfo.title || "Click for more info..."}</h3>
            <p class='description'> ${book.volumeInfo.description || "Click for more info..."}</p> 
            <p class='author'>${book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Anonimous..."}</p>
        </a>
    </div>`;
    } catch(error) {
        console.log("renderBook function error -> ", error);
    }
}  

renderBooks(books);


// --------------------------------------- sort ---------------------------------------------
const toggleDirection = (direction) => {
    try {
        if (direction === "down") {
            return "up";
        } else {
            return "down"
        }
    } catch(error) {
        console.log("toggleDirection function error -> ", error);
    }
}

// sort by date
const sortByPublishedDate = (setDirection) => {
    try {
        books.sort( (a,b) => {
            if (setDirection === "down") {
                return b.volumeInfo.publishedDate?.slice(0,4) - a.volumeInfo.publishedDate?.slice(0,4);
            } else {
                return a.volumeInfo.publishedDate?.slice(0,4) - b.volumeInfo.publishedDate?.slice(0,4);
            }
        })                                      

    } catch(error) {
        console.log("sortByPublishedDate error -> ", error); 
    }
}

btnSortByDate.addEventListener("click", (event) => {
    const setDirection = btnSortByDate.attributes.set.nodeValue;
    sortByPublishedDate(setDirection);
    renderBooks(books);
    btnSortByDate.classList.add("activeSort");
    btnSortByDate.setAttribute("set", toggleDirection(setDirection));
})


// sort by pages
const sortByAmountOfPages = (setDirection) => {
    try {
        books.sort( (a,b) => {
            if (b.volumeInfo.pageCount == undefined) {
                b.volumeInfo.pageCount = 0;
            }
            if (a.volumeInfo.pageCount == undefined) {
                a.volumeInfo.pageCount = 0;
            }
        
            if (setDirection === "down") {
                return a.volumeInfo.pageCount - b.volumeInfo.pageCount;
            } else {
                return b.volumeInfo.pageCount - a.volumeInfo.pageCount;
            }
        })
    } catch(error) {
        console.log("sortByAmountOfPages error -> ", error);
    }                                   
}

btnsortByPages.addEventListener("click", (event) => {
    const setDirection = btnsortByPages.attributes.set.nodeValue;
    sortByAmountOfPages(setDirection);
    renderBooks(books);
    btnsortByPages.setAttribute("set", toggleDirection(setDirection));
    btnsortByPages.classList.add("activeSort");
})
