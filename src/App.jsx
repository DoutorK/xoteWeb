import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EventScreen from './pages/EventScreen';
import CreateEvent from './pages/CreateEvent';
import TodosOsEventos from './pages/TodosOsEventos';
import SearchResults from './pages/SearchResults';
import TodosRecentes from './pages/TodosRecentes';


export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventScreen />}/>
        <Route path='/Create-Event' element={<CreateEvent/>}/>
        <Route path='/Found-Event' element={<TodosOsEventos/>}/>
        <Route path='//search?query=' element={<SearchResults/>}/>
        <Route path='/Recentes' element={<TodosRecentes/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
