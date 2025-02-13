/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Books() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([])
  const [searchBooks, setAllSearchBooks] = useState([])
  const BooksEndpoint = "/books";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_BASE_URL + BooksEndpoint)
    .then((response) => {
      setAllBooks(response.data.books);
      setBooks(response.data.books);
      setAllSearchBooks(response.data.books);
    })
    .catch((error) => console.error("Error fetching books:", error));
  },[])  

  const search = (e) => {
    console.log("running")
    const results = allBooks.filter((book) => {
       return book.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setAllSearchBooks(results);
    setBooks(results);
  };

  const available = () => {
    const results = searchBooks.filter((book) => book.available); // Correct arrow function
    setBooks(results);
  };

  const notAvailable = () => {
    const results = searchBooks.filter((book) => (!book.available)); // Correct arrow function
    setBooks(results);
  };

  const all = () => {
    setBooks(allBooks);
  };

return (
    <>
    <div>
      Filter by Availibilty <button onClick={available}>Available</button> <button onClick={notAvailable}>Not Available</button> <button onClick={all} >All</button>
    </div>
    <label>
        Search:
        <input type="text" onChange={search} />
    </label>
    <div className='mainBookContainer'>
      {books.map((book)=> {
        // console.log(book);
        
        return (
        <div key={book.id} className='individualBookContainer'>
          <div className = 'singlebooktitleandavailability'>
            <h2>{book.title}</h2>
            <p className="bookAvailibility">Book Availibility: {book.available ? "Availible" : "Not Available"}</p>
          </div>
          <img src={book.coverimage} alt={book.title} />
          <span>
            <p>by {book.author}</p>
            <p>ID: {book.id}</p></span>
            <button onClick={() => {
              console.log(`Navigating to book with ID: ${book.id}`); // Log book ID
              navigate(`/books/${book.id}`); // Navigate to the SingleBook page
            }}>See Details</button>
        </div>
        );
      })}   
    </div>
  
    </>
  )
}

export default Books