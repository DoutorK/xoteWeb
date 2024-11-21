import React, { useState, useEffect } from 'react';
import '../css/EventScreen.css';
import { useParams, Link } from 'react-router-dom';
import Navegation from '../components/Navegation';
import Footer from '../components/Footer';
import axios from 'axios';

export default function EventScreen() {
  const { id } = useParams();
  const [event, setEvent] = useState(null); // Inicialize como `null`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      console.log('ID recebido:', id); // Debug: Verificar ID
      try {
        const response = await axios.get(`https://xote-api-development.up.railway.app/xote/get/${id}`);
        console.log('Dados recebidos da API:', response); // Debug: Verificar toda a resposta

        if (response.data) {
          setEvent(response.data.event); // Setar os dados do evento
        } else {
          throw new Error('Nenhum dado retornado da API.');
        }
      } catch (err) {
        console.error('Erro ao buscar dados do evento:', err.response || err);
        setError(err.response?.data?.message || 'Erro ao carregar os dados do evento.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>{error}</p>;

  if (!event) return <p>Dados do evento não disponíveis.</p>;

  return (
    <div className="container">
      <Navegation />
      <div className="links">
        <Link to="/">Home</Link>
      </div>
      <main className="main-content">
        <div className="content">
          {/* Imagem */}
          <div className="image-container">
            {event.image_url ? (
              <img src={event.image_url} alt={event.title || 'Imagem do evento'} className="imagemEventScreen" />
            ) : (
              <p>Imagem não disponível</p>
            )}
          </div>

          {/* Informações do Evento */}
          <div className="info-container">
            <h2 className="titulos-dos-eventos"><span></span>{event.title}</h2>
            <span>Data do Evento:<p>{event.time}</p></span>
            {event.localgoogleurl && (
              <a
                href={event.localgoogleurl}
                target="_blank"
                rel="noopener noreferrer"
                className="botaodoGoogle"
              >
                Ver no Google Maps
              </a>
            )}
            <span style={{marginTop:10}}>Descrição do Evento:<p>{event.description}</p></span>
            <p>{event.pay}</p>
            <span>Cidade que ocorrerá o Evento:<p>{event.city}</p></span>
            <span style={{marginTop:10}}>Tipo do Evento:<p>{event.type}</p></span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
