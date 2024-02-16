import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { deleteBooksAPI, getBooksAPI } from './api/BookAPI';

const HomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            let books = await getBooksAPI();
            setBooks(books);
        }
        fetchBooks();
    }, []);

    const handleDeleteBook = async (bookId) => {
        await deleteBooksAPI(bookId)
            .then(() => {
                console.log('Book deleted from Firestore'); 
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to="/" className='btn btn-danger mx-3'>Accueil</Link>    
                <Link to="/books" className='btn btn-success mx-3'>Ajouter un livre</Link>

                <h1 className='text-center mx-3'>Home Page</h1>
            </div>

            <div className="container mt-5">
                <h2>Liste des livres</h2>
                <ul>
                    {books.map(book => (
                        <div className='card d-flex flex-row align-items-center justify-content-between' key={book.id}>
                            <div className="card-body">.
                                <img src="207114.png" alt={book.title} className="card-img-top" style={{width: '100px', height: '100px'}} />
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                            </div>
                            <div className="d-flex flex-column">
                                <Link to={`/books/edit/${book.id}`} className="btn btn-primary">Editer</Link>
                                <button className="btn btn-danger"  onClick={() => handleDeleteBook(book.id)}>Supprimer</button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default HomePage;
