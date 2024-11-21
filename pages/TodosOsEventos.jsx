import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../css/TodosOsEventos.css'
import Footer from "../components/Footer";
import Navegation from "../components/Navegation";
import goToFoundEvent from "./Home";

export default function TodosOsEventos() {
  const [events, setEvents] = useState([]);
  const [displayedEventsDate, setDisplayedEventsDate] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const recentEvents = await axios.get(
          "https://xote-api-development.up.railway.app/xote/get"
        );
        setEvents(recentEvents.data.XoteEventos);
        setDisplayedEventsDate(recentEvents.data.XoteEventos); // Atualiza o estado dos eventos exibidos
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <body>
      <Navegation/>
      <main >
      <div className="links">
        <Link to="/">Home</Link>
      </div>

      <div className="event-item">
        <h1 id="titulos">Encontrar Eventos</h1>
        <div className="event-grid">
          {displayedEventsDate.map((event) => (
            <ul key={`date-${event._id}`} className="lista" >
              <img
                onClick={() => goToEventScreen(eventDate._id)}
                src={event.image_url}
                alt="image"
              />
              <p>{event.time}</p>
              <h2
                className="titulos-dos-eventos"
              >
                {event.title}
              </h2>
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
        </div>
      </div>
    </main>
    <Footer/>  
    </body>
  );
}
