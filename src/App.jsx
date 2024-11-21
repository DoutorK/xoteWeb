import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EventScreen from './pages/EventScreen';
import CreateEvent from './pages/CreateEvent';


export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventScreen />}/>
        <Route path='/Create-Event' element={<CreateEvent/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
