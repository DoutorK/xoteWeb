import React, { useState } from "react";
import Navegation from "../components/Navegation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/CreateEvent.css";

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    image_url: "",
    title: "",
    city: "",
    local: "",
    localDescription: "",
    description: "",
    date: "",
    time: "",
    type: "",
    pay: false,
    price: "",
    localgoogleurl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Validações obrigatórias
    if (
      !eventData.image_url ||
      !/^https?:\/\/.+\..+$/.test(eventData.image_url) ||
      !eventData.title ||
      !eventData.city ||
      !eventData.local ||
      !eventData.localDescription ||
      !eventData.description ||
      !eventData.date ||
      !eventData.time ||
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(eventData.time) ||
      !eventData.type ||
      (eventData.pay && (!eventData.price || isNaN(eventData.price) || parseFloat(eventData.price) <= 0)) // Se o evento for pago, precisa ter preço válido
    ) {
      setError("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }
  
    // Formatar a data para o formato DD-MM-YYYY
    const formattedDate = new Date(eventData.date);
    const day = ("0" + formattedDate.getDate()).slice(-2);
    const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
    const year = formattedDate.getFullYear();
    eventData.date = `${day}-${month}-${year}`;
  
    // Se o evento não for pago, removemos o preço do objeto de dados
    if (!eventData.pay) {
      delete eventData.price;
    } else {
      // Garantir que o preço seja um número float
      eventData.price = parseFloat(eventData.price);
    }
  
    setLoading(true);

    try {
      // Envia os dados para a API
      await axios.post("https://xote-api-development.up.railway.app/xote/post", eventData);
      alert("Evento criado com sucesso!");
  
      // Reseta os campos do formulário após o envio
      setEventData({
        image_url: "",
        title: "",
        city: "",
        local: "",
        localDescription: "",
        description: "",
        date: "",
        time: "",
        type: "",
        pay: false,
        price: "",
        localgoogleurl: "",
      });
    } catch (err) {
      console.error("Erro ao criar o evento:", err);
      setError("Erro ao criar o evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <body>
      <Navegation />
      <main>
        <Link to='/'className="breadcrumb"> Home &gt; </Link>
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
                required
              />
             {/*
               {eventData.image_url && (
                <img
                  src={eventData.image_url}
                  alt="Preview"
                  className="image-preview"
                />
              )}
                 */}
            </div>
            <div>
              <label>Nome do seu Evento:</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className="event-input"
                required
              />
            </div>

            <div>
             <label>Data do Evento:</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="event-input-mini"
                required
              />
             </div> 

            <div>
              <label>Descrição do Local:</label>
              <input
                type="text"
                name="localDescription"
                value={eventData.localDescription}
                onChange={handleChange}
                className="event-input"
                required
              />
            </div>
          </div>

          <div className="event-row">
            <div>
              <label>Sobre o Evento:</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="event-textarea"
                required
              />
            </div>

         <div className="div-hora">
          <label>Hora:</label>
          <input
          className="event-input-mini"
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
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
                required
              />
            </div>
          </div>

          <div className="event-row">
            <div>
              <label>Tipo do Evento</label>
              <select
                name="type"
                value={eventData.type}
                onChange={handleChange}
                className="event-input"
                required
              >
                <option value="">Selecione</option>
                <option value="cultural">Cultural</option>
                <option value="religioso">Religioso</option>
                <option value="social">Social</option>  
              </select>
            </div>

            <div className="content-pay">
              <div className="div-pay1">
              <label>Pago?</label>
              <input
                className="checkbox-pay"
                type="checkbox"
                name="pay"
                checked={eventData.pay}
                onChange={handleChange}
                />
              </div>
                <div className="div-label-pay">
                  <label>Preço:</label>
                  <input
                    className="event-input-mini"
                    type="number"
                    name="price"
                    value={eventData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    disabled={!eventData.pay} 
                    style={{
                      backgroundColor: !eventData.pay ? "#f5f5f5" : "#fff", 
                      cursor: !eventData.pay ? "not-allowed" : "auto", 
                    }}
                  />
                </div>
            </div>

            <div>
              <label>Cidade</label>
              <input
                className="event-input"
                type="text"
                name="city"
                value={eventData.city}
                onChange={handleChange}
                required

              />
            </div>
          </div>

        <div>
          <label>URL do Local no Google Maps:</label>
          <input
            className="event-input"
            type="text"
            name="localgoogleurl"
            value={eventData.localgoogleurl}
            onChange={handleChange}
          />
        </div>
          <div className="div-button">
          <button
            onClick={handleSubmit}
            className="event-button"
            disabled={loading}
          >
            {loading ? "Criando..." : "Crie seu Evento"}
          </button>
          {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </body>
  );
}