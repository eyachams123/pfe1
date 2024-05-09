import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../PaymentForm/PaymentForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const FormationInscrire = () => {
    const navigate=useNavigate();
    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        address2: '',
        country: '',
        gender: '',
        birth: ''
    });

    // Handler for form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

   const handlecheckout=()=>{
    navigate("/pay");

   }

   const handleCheckoutLater = () => {
    const idFormation = localStorage.getItem("posteformation");
    const idUser = localStorage.getItem("id");
    const userType = localStorage.getItem("usertype");

    // Check the user type and perform different actions
    if (userType === "Freelancer") {
        // If user is a freelancer, execute this block
        axios.post(`http://localhost:5000/freelancerInscritFormationnonpayes/${idFormation}/${idUser}`)
            .then(response => {
                console.log("Request successful:", response.data);
                navigate("/acceuilfreel");
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {
        // If user is a client, execute this block
        axios.post(`http://localhost:5000/clientInscritFormationnonpayes/${idFormation}/${idUser}`)
            .then(response => {
                console.log("Request successful:", response.data);
                navigate("/acceuilcl");
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
};

    const inputStyle = {
        margin: '5px 0',
        padding: '5px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        width: '200px' // You can adjust the width as needed
    };

    return (
        <div className="payment-form">
            <h2>Registration Form</h2>
            <div className="row">
                <div className='col'>
                    <div className='container '>
                        <div className='form2'>
                            <h4>Enter your information to sign up in this training</h4>
                            <form >
                                {/* Form 2 content */}
                                <div className='form3'>
                                    <div>
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="" />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="" />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                                    </div>

                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="1234 Main St" />
                                    </div>

                                    <div>
                                        <label htmlFor="address2">Address 2 <span>(Optional)</span></label>
                                        <input type="text" id="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment or suite" />
                                    </div>

                                    <div>
                                        <label htmlFor="country">Country</label>
                                        <select id="country" value={formData.country} onChange={handleChange}>
                                            <option value="">Choose...</option>
                                            <option>United States</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="gender">Gender</label>
                                        <select id="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="">Choose...</option>
                                            <option>Female</option>
                                            <option>Male</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="birth">Birth</label><br />
                                        <input type="date" id="birth" value={formData.birth} onChange={handleChange} placeholder="" style={inputStyle} />
                                    </div>
                                </div>

                                <div>
                                    <input type="checkbox" id="save-info" />
                                    <label htmlFor="save-info">Save this information for next time</label>
                                </div>
                                <br />
                                <br />
                                <button onClick={handlecheckout} type="submit" style={{ marginRight: '10px', marginLeft: '270px' }}>Continue to checkout</button>
                                <button onClick={handleCheckoutLater}  type="button">Checkout Later</button>
                                <p style={{ color: '#808080', marginTop: '10px', fontSize: '12px' }}>
                                    <strong>Note:</strong> If you choose "Checkout Later," your information will be saved, and you can find this form in your basket on the homepage.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FormationInscrire;
