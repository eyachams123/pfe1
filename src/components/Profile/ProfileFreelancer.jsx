import React, { useEffect, useState } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from '../Posts/Posts';
import { Link ,useLocation ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const ProfileFreelancer = () => {
    const [user,setuser]=useState({});
    const [postesfr,setPostesFr]=useState([]);
   const navigate=useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const id=localStorage.getItem('id');
        if (!token  && usertype!=="Freelancer" && !id) {
            // Redirect to '/'
            navigate('/');
        }
        else {
            axios.get(`http://localhost:5000/freelancerGetFreelancer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                   console.log(response.data);
                   setuser(response.data);
                  
                })
                .catch(error => {
                    // Handle error
                });
                axios.get(`http://localhost:5000/getPostes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                       console.log(response.data);
                       setPostesFr(response.data);
                      
                    })
                    .catch(error => {
                        // Handle error
                    });
        }
    },[])
    const handlereviews= async ()=>{
        navigate("/reviews");
     }
    return (
        <div className='b'>
            <div className="container ">
                <div className="main-body">
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/acceuilfreel">Home</a></li>
                            <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                        </ol>
                    </nav>
                    {/* /Breadcrumb */}
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">{user.job}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                             {/*  About Me */}
                            <div className="card mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Journey</h6>
                                        <span className="text-secondary">
                                        {user.parcours ? user.parcours : "No journey information available"}
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">Skills</h6>
                                        <span className="text-secondary">
                                            {user.competences && user.competences.map((skill, index) => (
                                                <React.Fragment key={index}>
                                                    {skill}
                                                    {index !== user.competences.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Interests</h6>
                                        <span className="text-secondary">
                                        {user.intersts && user.intersts.map((interet, index) => (
                                                <React.Fragment key={index}>
                                                    {interet}
                                                    {index !== user.intersts.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0">Languages</h6>
                                        <span className="text-secondary">
                                        {user.languages && user.languages.map((language, index) => (
                                                <React.Fragment key={index}>
                                                    {language}
                                                    {index !== user.languages.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </li>
                                    {
                                        /*<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                          <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                                          <span className="text-secondary">bootdey</span>
                                                        </li> */
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">
                         {/*  Buttons */}
                         <div className="ButtonsContainer">
                                <button className="Profile button button1">Trainings</button>
                                <button onClick={handlereviews} className="Profile button">Reviews</button>
                            </div>
                            {/*  Infos */}
                            <div className="card mb-3">
                                <div className="card-body">
                                    
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                           {user.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                        {user.phoneNumber}
                                        </div>
                                    </div>
                                    <hr />
                                    
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                        {user.address}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                        <button className="btn btn-primary">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  Posts */}
                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Projects</i></h6>
                                            <Posts postesfr={postesfr} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFreelancer;
