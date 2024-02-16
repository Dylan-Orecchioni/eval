import React from 'react';
import { Link } from 'react-router-dom';
import { addBooksAPI } from './api/BookAPI';

const AddBook = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('categories');
        
        try {
            await addBooksAPI(title, category, description);
            console.log('Livre ajouté avec succés');
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de l\'ajout du livre:', error);
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
                        <option value="1">Roman historique</option>
                        <option value="4">Roman social</option>
                        <option value="2">Policier</option>
                        <option value="2">Conte philosophique</option>
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