import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import EditBook from './EditBook';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [editingBookId, setEditingBookId] = useState(null);

    useEffect(() => {
        const request = indexedDB.open('books', 1);

        request.onsuccess = function(event) {
            let db = event.target.result;

            const transaction = db.transaction(['books'], 'readonly');
            const booksStore = transaction.objectStore('books');
            const request2 = booksStore.getAll();

            request2.onsuccess = function(event) {
                setBooks(request2.result);
            }
        }
    }, []);

    const handleEditBook = (bookId) => {
        setEditingBookId(bookId);
    }

    const handleDeleteBook = (bookId) => {
        const request = indexedDB.open('books', 1);
        request.onsuccess = function(event) {
            let db = event.target.result;
            const transaction = db.transaction(['books'], 'readwrite');
            const booksStore = transaction.objectStore('books');
            const deleteRequest = booksStore.delete(bookId);

            deleteRequest.onsuccess = function(event) {
                console.log('Book deleted from IndexedDB');
            }

            deleteRequest.onerror = function(event) {
                console.error('Error deleting book from IndexedDB');
            }
        }

        setBooks(books.filter(book => book.id !== bookId));
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
