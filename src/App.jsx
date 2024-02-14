import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route, Link} from 'react-router-dom'
import AddBook from './AddBook'
import HomePage from './HomePage'
import EditBook from './EditBook'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<AddBook />} />
        <Route path="/books/edit/:bookId" element={<EditBook />} />
      </Routes>
    </>
  )
}

export default App
