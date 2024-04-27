import React from 'react';
import './PaymentForm.css';

const PaymentForm = () => {
    return (
        <div className="payment-form">
            <h2>Checkout form</h2>
            <div className="row">
                <div className='col'>
                <div className='container '>
                <div className='form2'>
                        <h4>Payment</h4>
                        <form>
                            {/* Form 3 content */}
                            <div>
                                <div>
                                    <input id="credit" name="paymentMethod" type="radio" checked />
                                    <label htmlFor="credit">Credit card</label>
                                </div>
                                <div>
                                    <input id="debit" name="paymentMethod" type="radio" />
                                    <label htmlFor="debit">Debit card</label>
                                </div>
                                <div>
                                    <input id="paypal" name="paymentMethod" type="radio" />
                                    <label htmlFor="paypal">PayPal</label>
                                </div>
                            </div>
<br/>
                            <div>
                                <div>
                                    <label htmlFor="cc-name">Name on card</label><br/>
                                    <small>Full name as displayed on card</small>
                                    <input type="text" id="cc-name" placeholder="   Name on card is" />
                                    
                                </div>

                                <div>
                                    <label htmlFor="cc-number">Credit card number</label>
                                    <input type="text" id="cc-number" placeholder=" Credit card number is" />
                                </div>

                                <div>
                                    <label htmlFor="cc-expiration">Expiration</label>
                                    <input type="text" id="cc-expiration" placeholder="  Expiration date" />
                                </div>

                                <div>
                                    <label htmlFor="cc-cvv">CVV</label>
                                    <input type="text" id="cc-cvv" placeholder=" Security code" />
                                </div>
                            </div>

                            <button type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
                </div>
                <div className='col'>
                    <div className='container'>
                        <div className='form1 '>
                            <h4>
                                <span>Your cart</span>
                            </h4>
                            <ul>
                                <li>
                                    <div>
                                        <h6>Product name</h6>
                                        <small>Brief description</small>
                                    </div>
                                    <span>$12</span>
                                </li>
                                <li>
                                    <span>Total (USD)</span>
                                    <strong>$12</strong>
                                </li>
                            </ul>

                            <form>
                                <div>
                                    <input type="text" placeholder="Promo code" />
                                    <button type="submit">Redeem</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentForm;
