import React, { useState } from 'react';
import Navbar from '../components/navbar.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Correo de restablecimiento enviado. Revisa tu bandeja.');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error al enviar el correo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al procesar la solicitud.');
    }
  };

  return (
    <fluid>
      <Navbar />
      <div className="forgot-password-container">
        <h2>Olvidé mi contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Ingresa tu correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Enviar correo</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </fluid>
  );
};

export default ForgotPassword;