import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { getBooksAPI, updateBookAPI } from './api/BookAPI';

const EditBook = () => {

    const { bookId } = useParams();
    const [bookData, setBookData] = useState({
        title: '',
        description: '',
        category: ''
    });


    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const books = await getBooksAPI();
                const book = books.find(book => book.id === bookId);
                if (book) {
                    setBookData(book);
                } else {
                    console.error(`Aucun livre trouvé avec l'ID ${bookId}`);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données du livre:', error);
            }
        };

        fetchBookData();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBookAPI(bookId, title, category, description);
            console.log('Livre mis à jour avec succès');
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la mise à jour du livre:', error);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to="/" className='btn btn-danger mx-3'>Retour</Link>    

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
                    <option value="">-----Sélectionner une catégorie-----</option>
                        <option value="Roman">Roman</option>
                        <option value="Roman historique">Roman historique</option>
                        <option value="Roman social">Roman social</option>
                        <option value="Policier">Policier</option>
                        <option value="Conte philosophique">Conte philosophique</option>
                        <option value="Science-fiction">Science-fiction</option>
                        <option value="Divers">Divers</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour</button>
            </form>
        </>
    );
};


export default EditBook;