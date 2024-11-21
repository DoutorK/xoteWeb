import React from 'react';

export default function TodosMaisVistos(){
    return(
        <body>
                    <div className="links">
          <Link to="/">Home</Link>
        </div>

        <div>
          <h1 id="titulos">Mais Recentes</h1>
          <div id="conteudo">
            {displayedEventsDate.map((eventDate) => (
              <ul key={`date-${eventDate._id}`} id="lista">
                <img
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
          </div>
        </div>
        </body>
    );

}