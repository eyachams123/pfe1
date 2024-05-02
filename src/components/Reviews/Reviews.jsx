import React, { useEffect, useState } from 'react';
import './Reviews.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = props.idfreelancer ||props.idformateur|| localStorage.getItem('id');
        const usertype = props.usertype || localStorage.getItem('usertype');
        const token = localStorage.getItem('token');

        if (!id || !usertype) {
          navigate("/");
          return;
        }
        let endpoint = "";
        if (!props.idfreelancer && !props.idformateur)
        {
         
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
              return;
          }
        }
        else {
          if (props.idfreelancer){
            endpoint = `http://localhost:5000/freelancerGetReviewsFreelancer/${id}`;
          }
          else {
            endpoint = `http://localhost:5000/freelancerGetReviewsForamteur/${id}`;
          }
        }
        
        console.log(id);
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle error
      }
    };

    fetchData();
  }, [props.id, props.usertype, navigate]);

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
