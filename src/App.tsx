import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {Layout} from './layout/Layout'
import {BookInfo} from './components/BookInfo/Bookinfo'
import {BooksList} from './components/BooksList/BooksList'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='books' element={<BooksList/>}/>
                    <Route path='books/:id' element={<BookInfo/>}/>
                    <Route path='*' element={<Navigate to='/' replace/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
