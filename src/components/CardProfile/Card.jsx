import React, { useEffect, useState } from 'react';
import './css/style.css'; // Import your CSS files
import Reviews from '../Reviews/Reviews';
import {Link, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from 'axios';
import { Language } from '@mui/icons-material';

const Card = () => {

  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };
  const location=useLocation();
  const [name, setname] = useState("");
  const [adress, setadress] = useState("");
  const [job, setjob] = useState("");
  const [phone,setphone]=useState("");
  const [competences, setcompetences] = useState([]);
  const [parcours, setparcours] = useState("");
  const [languages, setlanguages] = useState([]);


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

  console.log('ID:', id);
    axios.get(`http://localhost:5000/freelancerGetFreelancer/${id}`).then(response => {
      console.log(response.data);
      setname(response.data.name);
     setadress(response.data.address);
     setjob(response.data.job);
     setphone(response.data.phoneNumber);
     setcompetences(response.data.competences);
     setlanguages(response.data.languages);
     setparcours(response.data.parcours);



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
            <div className="yasmin"></div>
            <div className="content__bull">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="content__actions"><a href="#"></a></div>
          <div className="content__title">
            <h1>{name}</h1>
            <span>{job}</span>
            <p>{adress}</p>
            <p>{phone}</p>
          </div>
         
          <div className="content__description">
          <p className="classe">Journey:</p>
          <p>{parcours}</p>
          <p className="classe">Skills:</p>

            {competences.map((competence, index) => {
              return (
                <div key={index}>
                  <p>{competence}</p>
                </div>
              );
            })}
            <p className="classe">Languages:</p>
            {languages.map((language, index) => {
              
              return (
                <div key={index}>
              
                  <p>{language}</p>
                </div>
              );
            })}

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
      {showReviews && <Reviews  idfreelancer={id}/>}
    </main>
  );
};

export default Card;
