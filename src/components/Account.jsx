import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (!token) return; // Don't fetch if no token

    const fetchAccount = async () => {
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

    fetchAccount();
  }, [token]); // Re-fetch if token changes

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
      alert("Return Successful")
    } catch (err) {
      console.error("Error returning book:", err);
    }
  };

  return (
    <div className="accountInfo">
      <h2>Account Info</h2>
      <p>First Name: {accountInfo.firstname}</p>
      <p>Last Name: {accountInfo.lastname}</p>
      <p>Email: {accountInfo.email}</p>

      <h3>Borrowed Books:</h3>
      {accountInfo.books && accountInfo.books.length > 0 ? (
        <div>
          {accountInfo.books.map((book) => (
            <div key = {book.id} >
            <h2>{book.title}</h2>
          <img src={book.coverimage} alt={book.title} />
          <span>
            <p>by {book.author}</p>
            <p>ID: {book.id}</p></span>
            <button onClick={() => {
              console.log(book.id)
              returnBook(book.id);
              fetchAccount();
            }}>Return Book</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No borrowed books.</p>
      )}
    </div>
  );
}

export default Account;
