import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentClient from '../PaymentForm/PaymentFormClient';

const Sure = ({ onClose, isOpen, selectedFreelancerId, idproject }) => {
    const navigate = useNavigate();

    const handleNavigateToPayment = () => {
        const queryParams = new URLSearchParams({ selectedFreelancerId, idproject }).toString();
        navigate(`/paycl?${queryParams}`);
    };
    
    return (
        <div className={`sure-container ${isOpen ? 'open' : ''}`}>
            <h3>Are you Sure ?</h3>
            <button className='showbuttonfreelancers' style={{ marginRight: '10px' }} type="button" onClick={onClose}>No</button>
            <button onClick={handleNavigateToPayment} className='showbuttonfreelancers' type="submit">Yes</button>

            <p style={{ color: '#ff9409', marginTop: '10px', fontSize: '12px' }}>
                <strong>Note:</strong>
                If you click "Yes," you will be redirected to the payment form.
            </p>
        </div>
    );
}

export default Sure;
