import React, {useEffect, useState} from "react";

const FavouriteBook = () => {
    const [books, setBooks] = useState([]);

    useEffect( () => {
        fetch("http://localhost:3000/all-books").then(res => res.json()).then(data => console.log(data))
    }, [])
    return(
        <div>
            <h1>Favourite Books</h1>
        </div>
    )
}

export default FavouriteBook;