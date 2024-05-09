import React, { useEffect, useState } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from '../Posts/Posts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrainingsList from './TrainingsList';
const ProfileClient = () => {
    const [user, setuser] = useState({});
    const [postes, setPostes] = useState([]);
    const [projets, setProjets] = useState([]);
    const [isTrainingsListOpen, setIsTrainingsListOpen] = useState(false);

    const toggleTrainingsList = () => {
        setIsTrainingsListOpen(!isTrainingsListOpen);
    };
    const handleCloseTrainingsList = () => {
        setIsTrainingsListOpen(false);
    };
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');
        const id = localStorage.getItem('id');
        if (!token && usertype !== "Client" && !id) {
            // Redirect to '/'
            navigate('/');
        }
        else {
            console.log(id);
            axios.get(`http://localhost:5000/clientGetClient/${id}`, {
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
            axios.get(`http://localhost:5000/getPostesClient/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setPostes(response.data);

                })
                .catch(error => {
                    // Handle error
                });

            axios.get(`http://localhost:5000/getProjets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setProjets(response.data);

                })
                .catch(error => {
                    // Handle error
                });

        }

    }, [])
    const handlereviews = async () => {
        navigate("/reviews");
    }
    return (
        <div className='b'>

            <div className="container">
                <div className="main-body">
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="acceuilcl">Home</a></li>
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
                                        <h2>{user.name}</h2>

                                    </div>
                                </div>
                            </div>
                            {/*  About Me */}
                            <div className="card mt-3">
                                <ul className="list-group list-group-flush">
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

                                </ul>

                            </div>
                        </div>
                        <div className="col-md-8">

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
                                            <button className="Profile button button1" onClick={toggleTrainingsList}>Trainings</button>                                <button onClick={handlereviews} className=" btn btn-primary">Reviews</button>

                                        </div>
                                    </div>
                                    {isTrainingsListOpen && <TrainingsList formations={user.formations} onClose={handleCloseTrainingsList} isOpen={isTrainingsListOpen} />}
                                </div>
                            </div>
                            {/*  Posts */}
                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h4 style={{ color: '#0A1D56' }} className="d-flex align-items-center mb-3"><i className="material-icons mr-2">Posts</i></h4>
                                            <hr />
                                            {/* Project status details */}
                                            <Posts postes={postes} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h4 style={{ color: '#0A1D56' }} className="d-flex align-items-center mb-3"><i className="material-icons mr-2">Projects</i></h4>
                                            <hr />
                                            {/* Project status details */}
                                            <Posts projets={projets} />
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

export default ProfileClient;
