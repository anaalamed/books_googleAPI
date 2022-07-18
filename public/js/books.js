// ----------------------------------- variables ---------------------------------------------
const input            = document.querySelector('input#search');
const searchByAuthor   = document.querySelector('input#searchByAuthor');
const btnSortByDate    = document.querySelector('p#sortByDate');
const btnsortByPages   = document.querySelector('p#sortByPages');
const loader           = document.querySelector('.loader');
const sortButtns       = document.querySelector('.sortButtns');
let books              = [];

// --------------------------------------- flow ---------------------------------------------
// start books - default get request
const startDefaultFetch = () => {
    fetchBooks("2022")
    .then(data => {
        books = data.items;
        renderBooks(books);
    });
};
startDefaultFetch();

// submit search
document.querySelector('#search').addEventListener('submit', (event) => {
    try {
        event.preventDefault();
    
        if (input.value == "") {
            // need to improve to popup!!!
            alert("Not valid search"); 
            return false;
        } else {
            fetchBooks(input.value)
            .then( data => {
                books = data.items;
                renderBooks(books);
                loader.style.display = "none";
            }).catch( () => {
                console.log("fetchBooks error -> ", error);
            })
    
            resetSearch();
        }
    } catch(error) {
        console.log("search function error -> ", error);
    }
})

const resetSearch = () => {
    try {
        // clean root selector + loader
        document.querySelector('.booksWrapper').innerHTML = "";
        document.querySelector('.loader').style.display = "block";

        // remove sort buttons + active class 
        if (btnsortByPages.classList.contains("activeSort") || btnSortByDate.classList.contains("activeSort")) {
            btnsortByPages.classList.remove("activeSort");
            btnSortByDate.classList.remove("activeSort");
        }
        document.querySelector('.sortButtns').style.display = "none";
        document.querySelector('.errorNote').style.display = "none";


        // reset search value
        input.value = "";
    } catch(error) {
        console.log("resetSearch function error -> ", error);
    }
}

// -------------------------------- fetch data function ---------------------------------------
async function fetchBooks ( query ) {
    try {
        let data_url;
        if (searchByAuthor.checked == true ) {
            data_url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}`
        } else {
            data_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        }

        const response = await fetch(data_url);
        if (response.ok) {
            return await response.json();
        } else {
            return false;
        }
      } catch (error) {
        console.log("fetchBooks function error -> ", error);
      }
}

// ---------------------------------- render function  ---------------------------------------
// render books
const renderBooks = ( books = []) => {
    try {
        if (books.length ) {
            document.querySelector('.booksWrapper').innerHTML = books.map(renderBook).join("");
            document.querySelector('.sortButtns').style.display = "flex";
        } else {
            // if (!document.querySelector('.errorNote')) {
            //     document.querySelector('.booksSection').innerHTML += "<h2 class='errorNote'>There are no matches, try again!</h2>";
            // }
            document.querySelector('.errorNote').style.display = "block";
        }
        document.querySelector('.loader').style.display = "none";
    } catch(error) {
        console.log("renderBooks function error -> ", error);
    }
}

// render one book
const renderBook = (book = {}) =>  {
    try {
        const description = makeShortDescription(book);
        return `<div class='book' id=${book.id} data-published=${book.volumeInfo.publishedDate?.slice(0,4) || 0} data-pages=${book.volumeInfo.pageCount || 0}>
        <a href="${book.volumeInfo.infoLink}" target="_blank">
            <div class='imgWrapper'><img class='image' src=${book.volumeInfo.imageLinks?.thumbnail? book.volumeInfo.imageLinks.thumbnail : 'https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/2.png?alt=media&token=c67fdcbc-db88-4ab8-b3b7-e8c703603779'}></div>
            <h3 class='title' > ${book.volumeInfo.title || "Click for more info!"}</h3>
            <div class='tooltip'> 
                <p class='description'> ${description || "Click for more info!"}</p> 
                <span class='tooltiptext'>${book.volumeInfo.description || "Click for more info!" }</span>
            </div>
            <p class='author'>${book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Anonymous..."}</p>
        </a>
    </div>`;

    // <p class='description'> ${description || "Click for more info!"}</p> 
    } catch(error) {
        console.log("renderBook function error -> ", error);
    }
}  

// change description
const makeShortDescription = (book = {}) => {
    try {
        let description = book.volumeInfo.description;
        let wantedDescriptionLength = 110;
    
        if (description === "") {
            description = "Click for more info!";
        }
    
        if (description && description.length > wantedDescriptionLength) {
                description =  description.slice(0, wantedDescriptionLength).concat("...");
        }
        return description;
    }  catch(error) {
        console.log("makeShortDescription function error -> ", error);
    }

}

// ----------------------------------- sort funtion -------------------------------------------
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
        // if there is no published date function supposes it 0. Need to improve!
        books.sort( (a,b) => {
            if (setDirection === "down") {
                return (b.volumeInfo.publishedDate?.slice(0,4) || 0) - (a.volumeInfo.publishedDate?.slice(0,4) || 0);
            } else {
                return (a.volumeInfo.publishedDate?.slice(0,4) || 0) - (b.volumeInfo.publishedDate?.slice(0,4) || 0);
            }
        })                                      
    } catch(error) {
        console.log("sortByPublishedDate function error -> ", error); 
    }
}

document.querySelector('p#sortByDate').addEventListener("click", (event) => {
    const setDirection = btnSortByDate.attributes.set.nodeValue;
    sortByPublishedDate(setDirection);
    renderBooks(books);
    btnSortByDate.classList.add("activeSort");
    btnsortByPages.classList.remove("activeSort");
    btnSortByDate.setAttribute("set", toggleDirection(setDirection));
})


// sort by pages
const sortByAmountOfPages = (setDirection) => {
    try {
        // if there is no amount of pages function supposes it 0. Need to improve!
        books.sort( (a,b) => {        
            if (setDirection === "down") {
                return (b.volumeInfo.pageCount || 0) - (a.volumeInfo.pageCount || 0);
            } else {
                return (a.volumeInfo.pageCount || 0) - (b.volumeInfo.pageCount || 0);
            }
        })
    } catch(error) {
        console.log("sortByAmountOfPages function error -> ", error);
    }                                   
}

document.querySelector('p#sortByPages').addEventListener("click", (event) => {
    const setDirection = btnsortByPages.attributes.set.nodeValue;
    sortByAmountOfPages(setDirection);
    renderBooks(books);
    btnsortByPages.setAttribute("set", toggleDirection(setDirection));
    btnsortByPages.classList.add("activeSort");
    btnSortByDate.classList.remove("activeSort");
})