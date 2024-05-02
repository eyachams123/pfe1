import React, { useEffect, useState } from 'react';
import './css/style.css'; // Import your CSS files
import Reviews from '../Reviews/Reviews';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Card = () => {

  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };
  const location=useLocation();
  const [name, setname] = useState("");
  const [adress, setadress] = useState("");
  const [competances, setcompetances] = useState("");
  const [phone, setphone] = useState("");
  const [languages, setlanguages] = useState("");
  const [id,setid]=useState("");
  


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

  // Get the value of the 'id' parameter
  let id = queryParams.get('id');
  setid(id);
  // Remove the trailing equals sign if it exists
  if (id && id.endsWith('=')) {
    id = id.slice(0, -1);
  }

  // Now 'id' contains the correct value

    axios.get(`http://localhost:5000/freelancerGetFormateur/${id}`).then(response => {
      console.log(response.data);
      setname(response.data.name);
     setadress(response.data.address);
     setphone(response.data.phoneNumber);
     setcompetances(response.data.competances);
     setlanguages(response.data.languages);




  })
      .catch(error => {
          console.error(error);

      });


  }, []);
  return (
    <main className="cd__main">
      <div className="profile-page">
        <div className="content">
          <div className="content__cover">
            <div className="chams"></div>
            <div className="content__bull">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="content__actions"><a href="#"></a></div>
          <div className="content__title">
            <h1>{name}</h1><span>{adress}</span>
          </div>
          <div className="content__description">
            <p>{phone}</p>
            <p>{competances}</p>
            <p>{languages}</p>


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
      {showReviews && <Reviews  idformateur={id}/>}
    </main>
  );
};

export default Card;
