import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../css/TodosOsEventos.css'
import Footer from "../components/Footer";
import Navegation from "../components/Navegation";

export default function TodosRecentes() {
  const [events, setEvents] = useState([]);
  const [displayedEventsDate, setDisplayedEventsDate] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const sortedEvents = await axios.get(
          "https://xote-api-development.up.railway.app/xote/date/desc"
        );
        setEvents(sortedEvents.data.XoteEventos);
        setDisplayedEventsDate(sortedEvents.data.XoteEventos); // Atualiza o estado dos eventos exibidos
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
        <h1 id="titulos">Eventos Recentes</h1>
        <div className="event-grid">
          {displayedEventsDate.map((event) => (
            <ul key={`date-${event._id}`} className="lista">
              <img
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
