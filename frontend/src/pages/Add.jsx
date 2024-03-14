import React, { useState } from "react";

const Add = () => {
    const [book, setBooks] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    })
    const handleChange = (e) => {
        setBooks(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    console.log(book);
    return (
        <div className="form">
            <h1>Add books</h1>
                <input type="text" placeholder="title" onChange={handleChange} name="title"/>
                <input type="text" placeholder="description" onChange={handleChange} name="desc"/>
                <input type="number" placeholder="price" onChange={handleChange} name="price"/>
                <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
            </div>
    )
}

export default  Add;