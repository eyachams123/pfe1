import React, { useEffect, useState } from 'react';
import './Reviews.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    const usertype = localStorage.getItem('usertype');
    const token = localStorage.getItem('token');

    if (!id || !usertype) {
      navigate("/");
      return;
    }

    let endpoint = "";
    switch (usertype) {
      case 'Client':
        endpoint = `http://localhost:5000/clientGetReviewsClient/${id}`;
        break;
      case 'Formateur':
        endpoint = `http://localhost:5000/formateurGetReviewsForamteur/${id}`;
        break;
      case 'Freelancer':
        endpoint = `http://localhost:5000/freelancerGetReviewsFreelancer/${id}`;
        break;
      default:
        // Handle unknown user type
    }

    axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      setReviews(response.data);
    })
    .catch(error => {
      // Handle error
    });

  }, [navigate]); // Ensure useEffect runs only when navigate changes

  return (
    <div>
      {reviews.length === 0 ? (
        <h1>No reviews</h1>
      ) : (
        <div className='reviews container'>
          {reviews.map((review, index) => (
            <div className='review' key={index}>
              <h2>{review.auteur}</h2>
              <p>{review.note}</p>
              <p>{review.commentaire}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
