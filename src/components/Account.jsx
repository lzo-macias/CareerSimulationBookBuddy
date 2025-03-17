import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAccount = async () => {
    if (!token) return; 

    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccountInfo(result.data);
    } catch (err) {
      console.error("Error fetching account info:", err);
      setError("Failed to load account information.");
    }
  };

  useEffect(() => {
    fetchAccount();
  }, [token]);

  if (!token) {
    return <div>Please log in or create an account.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!accountInfo) {
    return <div>Loading account details...</div>;
  }

  const returnBook = async (bookid) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/reservations/${bookid}`, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(result.data);
      alert("Return Successful");
      await fetchAccount();
    } catch (err) {
      console.error("Error returning book:", err);
      alert("Failed to return book. Please try again.");
    }
  };

  return (
    <div className="accountInfo">
      <h2>Account Info</h2>
      <p>First Name: {accountInfo.firstname}</p>
      <p>Last Name: {accountInfo.lastname}</p>
      <p>Email: {accountInfo.email}</p>

      <h3>Borrowed Books:</h3>
      <div className="mainBookContainer">
        {accountInfo.books && accountInfo.books.length > 0 ? (
          accountInfo.books.map((book) => (
            <div key={book.id} className="individualBookContainer">
              <div className='singlebooktitleandavailability'>
                <h2>{book.title}</h2>
                <p className="bookAvailibility">
                  Book Availability: {book.available ? "Available" : "Not Available"}
                </p>
              </div>
              <img src={book.coverimage} alt={book.title} />
              <span>
                <p>by {book.author}</p>
                <p>ID: {book.id}</p>
              </span>
              <button onClick={() => {
                console.log(book.id);
                returnBook(book.id);
              }}>
                Return Book
              </button>
            </div>
          ))
        ) : (
          <p>No borrowed books.</p>
        )}
      </div>
    </div>
  );
}

export default Account;
