import React, { useState } from "react";
import Navegation from "../components/Navegation";
import Footer from "../components/Footer";
import axios from "axios";
import "../css/CreateEvent.css";

export default function CreateEvent() {

  
  const [eventData, setEventData] = useState({
    image_url: '',
    title: '',
    description: '',
    date: '',
    time: '', // Novo campo (pode ser opcional)
    type: '', // Novo campo (pode ser opcional)
    pay: false, // Usando booleano
    localgoogleurl: '', // Novo campo (pode ser opcional)
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
    setError(''); // Limpa o erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!eventData.title || !eventData.description) {
      setError('Título e descrição são obrigatórios!');
      return;
    }

    setLoading(true);

    // Garantir que os campos obrigatórios sejam preenchidos
    const eventToSend = {
      ...eventData,
      time: eventData.time || 'default-time', // Se 'time' não for preenchido, define um valor padrão
      type: eventData.type || 'default-type', // Se 'type' não for preenchido, define um valor padrão
      isFavorite: eventData.isFavorite || false, // Se 'isFavorite' não for preenchido, define como 'false'
      localgoogleurl: eventData.localgoogleurl || 'default-url', // Se 'localgoogleurl' não for preenchido, define um valor padrão
    };

    try {
      // Envio dos dados
      await axios.post('https://xote-api-development.up.railway.app/xote/post', eventToSend);
      alert('Evento criado com sucesso!');

      // Resetar o formulário após o envio
      setEventData({
        image_url: '',
        title: '',
        description: '',
        date: '',
        time: '',
        type: '',
        pay: false, // Retorna a `pay` como false (Gratuito)
        localgoogleurl: '',
      });

    } catch (error) {
      console.error('Erro ao criar o evento:', error);
      setError('Erro ao criar o evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <body>
      <Navegation />
      <main>
        <h1 className="breadcrumb"> Home &gt; Criar Evento</h1>
        <div className="event-container">
          <div className="event-row">
            <div className="content-labels">
              <label>URL da Imagem</label>
              <input
                type="text"
                name="image_url"
                value={eventData.image_url}
                onChange={handleChange}
                className="event-input"
              />
              {eventData.image_url && (
                <img
                  src={eventData.image_url}
                  alt="Preview"
                  className="image-preview"
                />
              )}
            </div>
            <div>
              <label>Nome do seu Evento</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className="event-input"
              />
            </div>
            <div>
              <label>Descrição do Local</label>
              <input
                type="text"
                name="localDescription"
                value={eventData.localDescription}
                onChange={handleChange}
                className="event-input"
              />
            </div>
          </div>

          <div className="event-row">
            <div>
              <label>Sobre o Evento</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="event-textarea"
              />
            </div>
            <div>
              <label>Localização</label>
              <input
                type="text"
                name="local"
                value={eventData.local}
                onChange={handleChange}
                className="event-input"
              />
            </div>
          </div>

          <div className="event-row">
            <div>
              <label>Tipo do Evento</label>
              <select
                name="pay"
                value={eventData.pay ? "true" : "false"}
                onChange={handleChange}
                className="event-input"
              >
                <option value="false">Gratuito</option>
                <option value="true">Pago</option>
              </select>
            </div>
            <div>
              <label>Data do Evento</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="event-input"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="event-button"
            disabled={loading}
          >
            {loading ? "Criando..." : "Crie seu Evento"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </main>
      <Footer />
    </body>
  );
}
