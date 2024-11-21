import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Captura o termo de pesquisa da URL
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://xote-api-development.up.railway.app/xote/get');
        setEvents(response.data.XoteEventos);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (query) {
      // Filtra os eventos com base no título (caso o título contenha o termo de pesquisa)
      const results = events.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) // Comparando com a propriedade `title`
      );
      setFilteredEvents(results);
    }
  }, [events, query]);

  return (
    <div>
      <h1>Resultados da Pesquisa</h1>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.time}</p>
            <img src={event.image_url} alt={event.title} />
          </div>
        ))
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}
    </div>
  );
};

export default SearchResults;
