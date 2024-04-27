import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const token = localStorage.getItem('token');
  const usertype = localStorage.getItem('usertype');
  const id = localStorage.getItem('id');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/getPostes/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data); // Log the fetched data
      setProjects(response.data); // Update projects state with fetched data
    })
    .catch(error => {
      // Handle error
    });
  }, []);

  return (
    <div>
      {projects.map(post => (
        <div key={post._id}>
          <h3>{post.titre}</h3>
          <p>{post.contenu}</p>
          {/* Render other project details here */}
        </div>
      ))}
    </div>
  );
};

export default Posts;
