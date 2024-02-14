import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';

const EditBook = () => {

    
    const { bookId } = useParams();
    const [bookData, setBookData] = useState({
        title: '',
        description: '',
        category: ''
    });



    useEffect(() => {
        const request = indexedDB.open('books', 1);

        request.onsuccess = function(event) {
            let db = event.target.result;
            const transaction = db.transaction(['books'], 'readonly');
            const booksStore = transaction.objectStore('books');
            const getRequest = booksStore.get(parseInt(bookId));

            getRequest.onsuccess = function(event) {
                const book = event.target.result;
                setBookData({
                    title: book.title,
                    description: book.description,
                    category: book.category
                });
            }
        }
    }, [bookId]);

    const { title, description, category } = bookData;

    const handleChangeTitle = (e) => {
        setBookData({ ...bookData, title: e.target.value });
    };

    const handleChangeDescription = (e) => {
        setBookData({ ...bookData, description: e.target.value });
    };

    const handleChangeCategory = (e) => {
        setBookData({ ...bookData, category: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = indexedDB.open('books', 1);

        request.onsuccess = function(event) {
            let db = event.target.result;
            const transaction = db.transaction(['books'], 'readwrite');
            const booksStore = transaction.objectStore('books');
            const getRequest = booksStore.get(parseInt(bookId));

            getRequest.onsuccess = function(event) {
                const book = event.target.result;
                book.title = title;
                book.description = description;
                book.category = category;
                const updateRequest = booksStore.put(book);

                updateRequest.onsuccess = function(event) {
                    console.log('Livre mis à jour avec succès');
                    window.location.href = '/';
                };

                updateRequest.onerror = function(event) {
                    console.error('Erreur lors de la mise à jour du livre');
                };
            }
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to="/" className='btn btn-danger mx-3'>Accueil</Link>    
                <Link to="/books" className='btn btn-success mx-3'>Ajouter un livre</Link>

                <h1 className='text-center mx-3'>Editer un livre</h1>
            </div>

            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={handleChangeTitle} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={description} onChange={handleChangeDescription}></textarea>
                </div>
                <div className="mb-3 d-flex flex-column">
                    <label htmlFor="categories" className="form-label">Catégorie</label>
                    <select name="categories" id="categories" value={category} onChange={handleChangeCategory}>
                        <option value="1">-----Sélectionner une catégorie-----</option>
                        <option value="1">Roman</option>
                        <option value="2">Policier</option>
                        <option value="3">Science-fiction</option>
                        <option value="4">Divers</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour</button>
            </form>
        </>
    );
};


export default EditBook;