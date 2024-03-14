import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([])  
        useEffect(()=>{                     // Cors needed
            const fetchAllBooks = async () => {
                try {
                    const res =  await axios.get("http://localhost:8800/books"); 
                    console.log(res);
                    setBooks(res.data);   
                } catch (err) {
                    console.log(err);
                }
            }
            fetchAllBooks();
        },[])
    return (
        <div>
            <h1>Books</h1>
                <div className="books">
                    {books.map (book => (
                    <div className="book" key={book.id}>
                        {book.cover && <img scr ={book.cover} alt=""/>}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                    </div>
                    ))}
                </div>
                    <button>
                        <Link to = "/Add">Add books</Link>
                    </button>
            </div>
    )
}

export default Books;