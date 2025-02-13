/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function SingleBook() {
  const [book, setBook] = useState(null);
  const { bookid } = useParams();
  const navigate = useNavigate();
  console.log(bookid)

  const singleBookEndpoint = `/books/${bookid}`

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_BASE_URL+singleBookEndpoint)
    .then((response) => {
      console.log(response.data.book)
      setBook(response.data.book)
    })
    .catch((err) => console.log(err))
  },[]);

  if (!book) {
    return <div>Loading...</div>;  // Show loading message until book is fetched
  }


  const checkoutBook = async () => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/books/${bookid}`, 
        { available: false }, // The request body
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(result.data);
      alert("Checkout Successful")
      navigate("/books")
    } catch (err) {
      console.error("Error checking out book:", err);
    }
  };
  

  return (
    <div className='singleBookMainContainer'>
      <div className='singleBookDisplayContainer'>
        <p className="bookAvailibility">Book Availibility: {book.available ? "Availible" : "Not Available"}</p>
        <h2>{book.title}</h2>
        <img src={book.coverimage} alt={book.title} />
        <p>{book.description}</p>
        <span>
          <p>by {book.author}</p>
          <p>ID: {book.id}</p></span>
       </div>
       {book.available && (
        <button onClick={checkoutBook}>Checkout</button>
      )}
    </div>
  )
}

export default SingleBook