import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './post.css';



const Posts = (props) => {
  const token = localStorage.getItem('token');
  const usertype = localStorage.getItem('usertype');
  const id = localStorage.getItem('id');




  return (
    <div>
      {props.postes && props.postes.map(post => (
        <div key={post._id}>
        <p style={{color:'#ff9409',textDecoration:'underline',textAlign:'center'}}>{post.domainTraining }</p>
          <p>{post.descriptionTraining}</p>
          <div className="action-icons">
            <FontAwesomeIcon icon={faEdit} className="edit-icon" />
            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
          </div>
          {/* Render other project details here */}
          <hr /> {/* Add a horizontal line */}
        </div>
      ))}
      {props.projets &&
        props.projets.map((post) => {
          const deadline = new Date(post.Deadline);
          const formattedDeadline = `${deadline.getDate()}/${deadline.getMonth() + 1}/${deadline.getFullYear()}`;
          return (
            <div key={post._id}>
              <p style={{color:'rgb(83 120 233)',textDecoration:'underline',textAlign:'center'}}>Domain:{post.domain}</p>

              <p>-Activity:{post.titre}</p>
              <p>-Description: {post.contenu}</p>
              <p>-Skills Needed: {post.Skills}</p>
              <p>- Deadline: {formattedDeadline}</p>
              <p style={{color:'rgb(83 120 233)',textDecoration:'underline'}}><strong>Budget:{post.Budget}</strong> </p>
              <div className="action-icons">
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
              </div>
              {/* Render other project details here */}
              <hr /> {/* Add a horizontal line */}

            </div>
          );
        })}

      {props.postesfr && props.postesfr.map(post => (
        <div key={post._id}>
          <h3>{post.domain}</h3>
          <p>Activity: {post.activity}</p>

          <p>Description: {post.description}</p>
          <p>Files: </p>

          <div className="action-icons">
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
           </div>
          <hr /> {/* Add a horizontal line */}

          {/* Render other project details here */}
        </div>
      ))}
    </div>

  );
};

export default Posts;
