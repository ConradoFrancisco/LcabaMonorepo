"use client";

import { FormEvent, useState } from "react";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setWasSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWasSubmitted(true);
  };

  return (
    <>
      <footer className="revista-footer">
    <div className="container revista-footer__container">
      <div className="revista-footer__brand">
        <div className="revista-footer__brand-row">
          <img src={'https://www.legislatura.gob.ar/_pagedata/page/images/fmgyw7dfxx_1664903694.6236.png'} style={{width:'264px'}}/>
         
        </div>
        <p>Legislatura Ciudad Autónoma de Buenos Aires</p>
      </div>

      <div className="revista-footer__contact">
        <div className="revista-footer__cta">
          <span>
            <small>#AlzáTuVoz</small>
            <strong>Dejanos tus<br />propuestas.</strong>
          </span>
          <button
            className="revista-footer__plus"
            type="button"
            aria-label="Dejar una propuesta"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        </div>
        <a href="mailto:lacasa@legislatura.gob.ar">lacasa@legislatura.gob.ar</a>
        <span aria-hidden="true"> © {new Date().getFullYear()}</span>
      </div>
    </div>
      </footer>

      {isModalOpen && (
        <div
          className="revista-proposal-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className="revista-proposal-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="proposal-modal-title"
          >
            <div className="revista-proposal-modal__topbar">
              <span>Tu voz hace la diferencia</span>
              <button type="button" aria-label="Cerrar formulario" onClick={closeModal}>×</button>
            </div>
            <div className="revista-proposal-modal__body">
              <h2 id="proposal-modal-title">Dejanos tus propuestas.<br />¡Gracias!</h2>

              {wasSubmitted ? (
                <div className="revista-proposal-modal__pending">
                  Gracias por completar el formulario. El envío se conectará próximamente.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="revista-proposal-modal__grid">
                    <label>Nombre<input name="nombre" autoComplete="given-name" required /></label>
                    <label>Apellido<input name="apellido" autoComplete="family-name" required /></label>
                  </div>
                  <label>Área<input name="area" /></label>
                  <div className="revista-proposal-modal__grid">
                    <label>Email<input type="email" name="email" autoComplete="email" required /></label>
                    <label>Celular<input type="tel" name="celular" autoComplete="tel" /></label>
                  </div>
                  <label>Comentario<textarea name="comentario" rows={6} required /></label>
                  <button className="revista-proposal-modal__submit" type="submit">Enviar datos</button>
                </form>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Footer;
