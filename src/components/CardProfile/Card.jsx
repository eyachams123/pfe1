import React, { useEffect, useState } from 'react';
import './css/style.css'; // Import your CSS files
import Reviews from '../Reviews/Reviews';
const Card = () => {

  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };
 

  return (
    <main className="cd__main">
      <div className="profile-page">
        <div className="content">
          <div className="content__cover">
            <div className="content__avatar"></div>
            <div className="content__bull">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="content__actions"><a href="#"></a></div>
          <div className="content__title">
            <h1>Samantha Jones</h1><span>New York, United States</span>
          </div>
          <div className="content__description">
            <p>Web Producer - Web Specialist</p>
            <p>Columbia University - New York</p>
          </div>
          <div className="content__button">
        <button className="button" onClick={toggleReviews}>
          <div className="button__border"></div>
          <div className="button__bg"></div>
          <p className="button__text">Show Reviews</p>
        </button>
      </div>
         
        </div>
        <div className="bg">
          <div><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        </div>
     
      </div>
      {showReviews && <Reviews />}
    </main>
  );
};

export default Card;
