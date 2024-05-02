import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Interests.css';
import Background from '../Background/Background';


const Interests = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [selectedFields, setSelectedFields] = useState([]);

    const toggleField = (field) => {
        const index = selectedFields.indexOf(field);
        if (index === -1) {
            setSelectedFields([...selectedFields, field]);
        } else {
            setSelectedFields(selectedFields.filter(item => item !== field));
        }
    };
    let formData = {
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        username: searchParams.get('email'),
        password: searchParams.get('password'),
        role: searchParams.get('role'),
        job: searchParams.get('job'),
        jobDescription: searchParams.get('jobDescription'),
        parcours: searchParams.get('journey'),
        phoneNumber: searchParams.get('phoneNumber'),
        address: searchParams.get('address'),
        competences: searchParams.get('skills') ? searchParams.get('skills').split(",") : [],
        languages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
        intersts: selectedFields
    }
    console.log(formData);
    const handelformsubmit = () => {
        console.log(formData);
        if (formData.role === "freelancer") {
            console.log(formData.intersts);
            axios.post("http://localhost:5000/signupFreelancer", formData).then(response => {
                console.log(response.data);
                if (response.data === "Signup successful") {
                    navigate(`/success`);
                }
            })
                .catch(error => {
                    console.error(error);

                });
        }
        else if (formData.role === 'client') {
            axios.post("http://localhost:5000/signupClient", formData).then(response => {
                console.log(response.data);
                formData = {
                    name: searchParams.get('name'),
                    email: searchParams.get('email'),
                    username: searchParams.get('email'),
                    password: searchParams.get('password'),
                    phoneNumber: searchParams.get('phoneNumber'),
                    address: searchParams.get('address'),
                    languages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
                    intersts: selectedFields
                }
                if (response.data === "Signup successful") {
                    navigate(`/success`);
                }
            })
            .catch(error => {
                console.error(error);

            });
        } else {
            formData = {
                name: searchParams.get('name'),
                email: searchParams.get('email'),
                username: searchParams.get('email'),
                password: searchParams.get('password'),
                phoneNumber: searchParams.get('phoneNumber'),
                address: searchParams.get('address'),
                competances: searchParams.get('skills') ? searchParams.get('skills').split(",") : [],
                languages: searchParams.get('selectedLanguages') ? searchParams.get('selectedLanguages').split(",") : [],
                interets: selectedFields
            }
            console.log(formData);
            axios.post("http://localhost:5000/signupFormateur", formData).then(response => {
                console.log(response.data);
                if (response.data === "Signup successful") {
                    navigate(`/success`);
                }
            })
                .catch(error => {
                    console.error(error);

                });
        }
    }

    const displaySelectedFields = () => {
        return selectedFields.map((field, index) => (
            <li key={index}>{field}</li>
        ));
    };


    const handlePrevious = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <div className='interests'>
        <Background/>
            <div className="container">
                <label htmlFor="fieldsInput" className="label">Which fields you are interested in :</label>
                <div className="input-container">
                    <button className="field-button" onClick={() => toggleField('Programming')}>Programming</button>
                    <button className="field-button" onClick={() => toggleField('Web Development')}>Web Development</button>
                    <button className="field-button" onClick={() => toggleField('Marketing')}>Marketing</button>
                    <button className="field-button" onClick={() => toggleField('Software Development')}>Software Development</button>
                    <button className="field-button" onClick={() => toggleField('UI/UX Design')}>UI/UX Design</button>
                    <button className="field-button" onClick={() => toggleField('Graphic Design')}>Graphic Design</button>
                    <button className="field-button" onClick={() => toggleField('Data Science')}>Data Science</button>
                    <button className="field-button" onClick={() => toggleField('Digital Marketing')}>Digital Marketing</button>
                    <button className="field-button" onClick={() => toggleField('Content Writing')}>Content Writing</button>
                    <button className="field-button" onClick={() => toggleField('Project Management')}>Project Management</button>
                    <button className="field-button" onClick={() => toggleField('Business Analysis')}>Business Analysis</button>
                    <button className="field-button" onClick={() => toggleField('Cybersecurity')}>Cybersecurity</button>
                </div>
                <ul id="selectedFieldsList">
                    {displaySelectedFields()}
                </ul>
                <div className="button-container">
                    <button className='btn' onClick={handlePrevious}>Previous</button>
                    <button className='btn' onClick={handelformsubmit}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Interests;
