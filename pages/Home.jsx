import React, { useEffect, useState } from 'react';
import Navegation from '../components/Navegation'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/Home.css';
import axios from 'axios';
import Footer from '../components/Footer';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [eventsDate, setEventsDate] = useState([]);
  const [displayedEventsDate, setDisplayedEventsDate] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  const goToEventScreen = (id) => {
    navigate(`/event/${id}`);
  };

  const navigateFound = useNavigate();
  const goToFoundEvent = () => {
    navigateFound(`/Found-Event`);
  };

  const navigateRecentes = useNavigate();
  const goToRecentes = () => {
    navigateRecentes(`/Recentes`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const recentEvents = await axios.get('https://xote-api-development.up.railway.app/xote/get');
        const sortedEvents = await axios.get('https://xote-api-development.up.railway.app/xote/date/desc');
        
        const screenWidth = window.innerWidth;
        const itemsToShow = screenWidth >= 2080 ? 6 : 6;

        // Define os eventos e eventos exibidos
        setEvents(recentEvents.data.XoteEventos);
        setEventsDate(sortedEvents.data.XoteEventos);
        setDisplayedEvents(recentEvents.data.XoteEventos.slice(0, itemsToShow));
        setDisplayedEventsDate(sortedEvents.data.XoteEventos.slice(0, itemsToShow));
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, [location]);

  if (!events || events.length === 0 || !eventsDate || eventsDate.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Navegation />
      <main>
        <div className="links">
          <Link to="/" style={{ fontSize: 16 }}>Home</Link>
        </div>

        <div>
          <h1 id="titulos">Mais Recentes</h1>
          <div id="conteudo">
            {displayedEventsDate.map((eventDate) => (
              <ul key={`date-${eventDate._id}`} className="lista">
                <img
                  className='imagem'
                  src={eventDate.image_url}
                  alt="image"
                  onClick={() => goToEventScreen(eventDate._id)}
                />
                <p>{eventDate.time}</p>
                <h2 onClick={() => goToEventScreen(eventDate._id)} className='titulos-dos-eventos'>{eventDate.title}</h2>
                <a
                  href={eventDate.localgoogleurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="botaodoGoogle"
                >
                  Ver no Google Maps
                </a>
              </ul>
            ))}
            <div id="botao-completo" onClick={goToRecentes}>
              <button className="botao-com-seta">→</button>
              <h1 id="ver-tudo">Ver Tudo</h1>
            </div>
          </div>
        </div>

        <div className="parte2">
          <h1 id="titulos">Encontre Eventos</h1>
          <div id="conteudo">
            {displayedEvents.map((event) => (
              <ul key={`event-${event._id}`} className="lista">
                <img
                  className='imagem'
                  src={event.image_url}
                  alt="image"
                  onClick={() => goToEventScreen(event._id)}
                />
                <p>{event.time}</p>
                <h2 onClick={() => goToEventScreen(event._id)} className='titulos-dos-eventos'>{event.title}</h2>
                <a
                  href={event.localgoogleurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="botaodoGoogle"
                >
                  Ver no Google Maps
                </a>
              </ul>
            ))}
            <div id="botao-completo" onClick={goToFoundEvent}>
              <button className="botao-com-seta">→</button>
              <h1 id="ver-tudo">Ver Tudo</h1>
            </div>
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
