import React, { useState, useEffect } from 'react';
import '../css/EventScreen.css';
import { useParams } from 'react-router-dom';
import Navegation from '../components/Navegation';
import Footer from '../components/Footer';
import axios from 'axios';

export default function EventScreen() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null); // Inicialize como `null`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      console.log('ID recebido:', id); // Debug: Verificar ID
      try {
        const response = await axios.get(`https://xote-api-development.up.railway.app/xote/get/${id}`);
        console.log('Dados recebidos da API:', response); // Debug: Verificar toda a resposta

        if (response.data) {
          setEvento(response.data); // Setar os dados do evento
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

  if (!evento) return <p>Dados do evento não disponíveis.</p>;

  return (
    <div className="container">
      <Navegation />
      <main className="main-content">
        <ul id="lista">
          {evento.image_url ? (
            <img src={evento.image_url} alt={evento.title || 'Imagem do evento'} />
          ) : (
            <p>Imagem não disponível</p>
          )}
          <h2 className="titulos-dos-eventos">{evento.title}</h2>
          <p>{evento.time}</p>
          {evento.localgoogleurl && (
            <a
              href={evento.localgoogleurl}
              target="_blank"
              rel="noopener noreferrer"
              className="botaodoGoogle"
            >
              Ver no Google Maps
            </a>
          )}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
