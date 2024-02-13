import React, {useEffect, useState} from "react";
import BookCards from "../components/BookCards";

const FavouriteBook = () => {
    const [books, setBooks] = useState([]);

    useEffect( () => {
        fetch("http://localhost:3000/all-books").then(res => res.json()).then(data => console.log(data))
    }, [])
    return(
        <div>
            <BookCards books={books} headline = "Best Seller Books" />
        </div>
    )
}

export default FavouriteBook;