import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const request = indexedDB.open('books', 1);

request.onupgradeneeded = function(event){
  let db = event.target.result;

  let bookStore = db.createObjectStore('books', {keyPath: 'id', autoIncrement: true});

  if (localStorage.getItem('books') !== null && localStorage.getItem('books') !== '') {
    let books = JSON.parse(localStorage.getItem('books'));

    for(let book of books) {
      bookStore.put(book);
    }

  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
