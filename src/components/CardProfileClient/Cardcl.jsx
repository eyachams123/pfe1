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
  const location = useLocation();
  const [name, setname] = useState("");
  const [adress, setadress] = useState("");
  const [phone, setphone] = useState("");
  const [id, setid] = useState("");
  const [languages, setlanguages] = useState([]);




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
    axios.get(`http://localhost:5000/freelancerGetClient/${id}`).then(response => {

      console.log(response.data);
      setname(response.data.name);
      setadress(response.data.address);
      setphone(response.data.phoneNumber);
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
            <div className="eya"></div>
            <div className="content__bull">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="content__actions"><a href="#"></a></div>
          <div className="content__title">
            <h1>{name}</h1>
            <span>{adress}</span>
          </div>
          <div className="content__description">
            <p>{phone}</p>
            <p>Languages:</p>
            {languages.map((language, index) => (
              <div key={index}>
                <p>{language}</p>
              </div>
            ))}
          </div>

          <div className="content__button">

          </div>

        </div>
        <div className="bg">
          <div><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        </div>

      </div>
    </main>
  );
};

export default Card;
