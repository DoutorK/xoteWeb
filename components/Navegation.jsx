import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import './Navegation.css';

 const Navegation = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const goToCreatePage = () =>{
    navigate("/Create-Event");
  };

  const isCreatePage = location.pathname === '/Create-Event'

  return (

  <nav className="navbar">
      
      {/*EU ODEIO LUCAS */}
      <div className="logo">
        <span className="logo-xote">Xote</span><span className="logo-eventos">Eventos</span>
      </div>
      
      {/*PESQUISA */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Pesquisar Eventos" />
      </div>

      {/*LOCALIZAÇÃO */}
      <div className="location-content">
        <FaMapMarkerAlt className="location-icon" />
        <span className='location' >Juazeiro do Norte</span>
        <FaChevronDown className="chevron-down" />
      </div>

      {/*BOTÃO*/}
      {!isCreatePage && (
      <button className="create-event-button"
      onClick={goToCreatePage}>Crie seu Evento</button>)}
    </nav>
  )
}
export default Navegation;
