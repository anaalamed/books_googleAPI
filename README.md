# Google API Books
### The project is developed with HTML, SCSS and Vanilla JS. 
### Deploy - https://books--api.web.app

</br>

This is a project challenge from E-square company. In this project I used Google Books API and rendered the books I got. There are 3 sections in the page: header with search input, main books section and footer.   
</br>

There is an option to search by text string in all fields or by author:
![search](https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2021.29.11.png?alt=media&token=b2684504-5553-439e-8a4b-d464a27ae58c) 

</br>

There is a simple loader while waiting data from the API: 
![loader](https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2022.08.53.png?alt=media&token=1cd28aff-62ac-4110-810a-098c73f75617)

</br>

There is an option to sort the books by published date or amount of page:
![sort](https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2021.46.40.png?alt=media&token=29b4f91a-3537-46f7-9e3a-c0ef32ebb8fb) 

</br>

The page is responsive and match all the sizes of screens:

<p align="center">
    <img alt="desktop" src="https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2021.13.43.png?alt=media&token=1d384d93-74fa-41ea-aec1-ed6176ae1c01" width="100%" >
    <img alt="tablet" src="https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2021.20.08.png?alt=media&token=ee2b3673-3d32-4121-93ea-cf40ac69e0cb" width="50%">
    <img alt="mobile" src="https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2021.18.32.png?alt=media&token=d94dd063-ce2e-4da0-afcd-09e1d0b2ff10" width="38%">    

</p>
</br>

The card of book contains image, title, description and it's author. For all the fields there are default values, like default picture or "anonymous" instead of author. On hover there is a tooltip for long description:
![card book](https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2022.21.07.png?alt=media&token=d4a8f4f6-02ca-4aa6-b6b3-305f0c4e3188)  


At html structure there are some attributes to check the sort methods: 
![card html](https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2022.26.10.png?alt=media&token=aad5c640-e001-42b9-8ca9-0dfc0e7ee94f)

</br>

If the API returns empty array it will ask you to try again:    

![alt text](https://firebasestorage.googleapis.com/v0/b/books--api.appspot.com/o/Screen%20Shot%202022-07-18%20at%2021.56.42.png?alt=media&token=a81f2821-1db6-4b08-8f75-6b4ec6646b9b) 
