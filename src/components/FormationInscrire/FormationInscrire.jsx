import React from 'react';
import { Link } from 'react-router-dom';
import '../PaymentForm/PaymentForm.css';
const FormationInscrire = () => {
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
                        <form>
                            {/* Form 2 content */}
                            <div className='form3'>
                                <div>
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" id="firstName" placeholder="" />
                                </div>

                                <div>
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" id="lastName" placeholder=""/>
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="you@example.com" />

                                </div>

                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" placeholder="1234 Main St" />

                                </div>

                                <div>
                                    <label htmlFor="address2">Address 2 <span>(Optional)</span></label>
                                    <input type="text" id="address2" placeholder="Apartment or suite" />
                                </div>

                                <div>
                                    <label htmlFor="country">Country</label>
                                    <select id="country" >
                                        <option value="">Choose...</option>
                                        <option>United states</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <select id="gender" >
                                        <option value="">Choose...</option>
                                        <option>Female</option>
                                        <option>Men</option>
                                    </select>

                                </div>

                                <div>
                                    <label htmlFor="Birth">Birth</label><br/>
                                    <input type="date" id="Birth" placeholder="" style={inputStyle}/>
                                </div>
                            </div>

                            <div>
                                <input type="checkbox" id="save-info" />
                                <label htmlFor="save-info">Save this information for next time</label>
                            </div>
<br/>
<br/>
                            <Link to="/pay" style={{marginRight: '10px' , marginLeft:'250px'}}><button type="submit" style={{marginRight: '10px' , marginLeft:'270px'}}>Continue to checkout</button></Link>
                            <button type="submit">Checkout Later</button>
                            <p style={{color: '#808080', marginTop: '10px', fontSize: '12px'}}>
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
