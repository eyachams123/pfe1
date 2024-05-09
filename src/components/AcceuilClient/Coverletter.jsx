// Coverletter.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Coverletter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nomclient = searchParams.get('nomclient');
  const contenu = searchParams.get('contenu');
  const nom = searchParams.get('nom');

  return (
    <div className="letter-container">
      <p>Cher {nomclient},</p>
      <p>{contenu}</p>
      <p>Cordialement,</p>
      <p>{nom}</p>
    </div>
  );
};

export default Coverletter;
