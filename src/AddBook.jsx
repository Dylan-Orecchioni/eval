import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddBook = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imagePath = formData.get('imagePath');
        const category = formData.get('categories');
        
        const request = indexedDB.open('books', 1);

        request.onsuccess = function(event) {
            let db = event.target.result;

            const transaction = db.transaction(['books'], 'readwrite');
            const booksStore = transaction.objectStore('books');
            const newBook = {
                title: title,
                description: description,
                imagePath: imagePath,
                category: category
            };

            const addRequest = booksStore.add(newBook);

            addRequest.onsuccess = function(event) {
                console.log('Nouveau livre ajouté à IndexedDB');
            };

            addRequest.onerror = function(event) {
                console.error('Erreur lors de l\'ajout du livre à IndexedDB');
            };
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to="/" className='btn btn-danger mx-3'>Accueil</Link>    
                <h1 className='text-center mx-3'>Ajouter un livre</h1>
            </div>

            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre</label>
                    <input type="text" className="form-control" id="title" name="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3"></textarea>
                </div>
                <div className="mb-3 d-flex flex-column">
                    <label htmlFor="categories" className="form-label">Catégorie</label>
                    <select name="categories" id="categories" className="form-select">
                        <option value="1">-----Sélectionner une catégorie-----</option>
                        <option value="1">Roman</option>
                        <option value="2">Policier</option>
                        <option value="3">Science-fiction</option>
                        <option value="4">Divers</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </>

    );

};

export default AddBook;