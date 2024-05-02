import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of NavLink

import './Home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Background from '../Background/Background';
import gifImage from '../images/pic.gif';

function Home() {
    const [generalQuestionsVisible, setGeneralQuestionsVisible] = useState(false);
    const [paymentQuestionsVisible, setPaymentQuestionsVisible] = useState(false);

    const toggleGeneralQuestions = () => {
        setGeneralQuestionsVisible(true);
        setPaymentQuestionsVisible(false);
    };

    const togglePaymentQuestions = () => {
        setGeneralQuestionsVisible(false);
        setPaymentQuestionsVisible(true);
    };

    useEffect(() => {
        const plusSigns = document.querySelectorAll('.plus-sign');
        const images = document.querySelectorAll('.rotate-zoom-out img');

        plusSigns.forEach(plusSign => {
            plusSign.addEventListener('click', function () {
                const answer = this.nextElementSibling;
                if (answer) {
                    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                }
            });
        });


        // Clean up event listeners on component unmount
        return () => {
            plusSigns.forEach(plusSign => {
                plusSign.removeEventListener('click', function () { });
            });

        };
    }, []);



    return (
        <div className='Home white'>
            <Navbar />
            <Background />
            <div className="mb-5"></div>
            <div className="container text-center">
                <h2 className="section-title mb-4">Welcome To Our Platform!</h2>
                <img className='gifimg' src={gifImage} alt="GIF" />
                <div className="description-frame welcome">
                
                    <p className="section-description welcoome">Welcome to Freelanzo, where innovation meets collaboration.
                        <br />We offer a unique and exciting experience. Explore our platform to discover great features.</p>
                </div>
            </div>
            <div className="mb-5"></div>
            <br />
            <br />
            <div className="container py-5 text-center">
                <h2 className="section-title">Discover Us</h2>
                <p className="section-description"> Our platform is engineered to transform the way freelancers, trainers, and clients connect and thrive together. Explore a world where opportunities abound and every project is a stepping stone towards success. Freelanzo is dedicated to your professional growth. Discover the possibilities that await you at Freelanzo and join a network that values creativity and commitment.</p>
                <br />
                <br />
                <br />
                <br />
                <Carousel className='ca' interval={1500}>
                    <Carousel.Item>
                        <img className="d-block mx-auto" src={require('../images/3.jpg')} style={{ width: '500px', height: '250px' }} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block mx-auto" src={require('../images/4.jpg')} style={{ width: '500px', height: '250px' }} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block mx-auto" src={require('../images/2.jpg')} style={{ width: '500px', height: '250px' }} alt="Third slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block mx-auto" src={require('../images/5.jpg')} style={{ width: '500px', height: '250px' }} alt="Fourth slide" />
                    </Carousel.Item>

                </Carousel>
            </div>

            <div className="mb-5"></div>

            <div className="container py-5 text-center">
                <h2 className="section-title">We are best in</h2>
                <br />
                <br />
                <div className="d-flex flex-wrap " style={{ marginLeft: '100px' }}>
                    <div className="circle-button mb-2 mr-2 rotate-zoom-out">
                        <img src={require('../images/checkmark.png')} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="Delivering Exceptional Quality" className="circle-button-img" />
                        <br /> <span>Delivering Exceptional Quality</span>
                    </div>
                    <div className="circle-button mb-2 mr-2 rotate-zoom-out">
                        <img src={require('../images/idea.png')} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="Turning Visions into Reality " className="circle-button-img" />
                        <br /><span>Turning Visions into Reality</span>
                    </div>
                    <div className="circle-button mb-2 mr-2 rotate-zoom-out">
                        <img src={require('../images/puzzle.png')} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="Crafting Perfect Solutions" className="circle-button-img" />
                        <br /> <span>Crafting Perfect Solutions</span>
                    </div>
                    <div className="circle-button mb-2 mr-2 rotate-zoom-out">
                        <img src={require('../images/graph.jpg')} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="Exceeding Expectations" className="circle-button-img" />
                        <br />  <span>Exceeding Expectations</span>
                    </div>
                    <div className="circle-button mb-2 mr-2 rotate-zoom-out">
                        <img src={require('../images/empowering.png')} style={{ width: '100px', height: '100px', borderRadius: '50%' }} alt="Empowering Your Projects" className="circle-button-img" />
                        <br /><span>Empowering Your Projects</span>
                    </div>

                </div>
            </div>

            <div className="container py-5 text-center">
                <div className="section-frame">
                    <h2 className="section-title mb-4">Some Questions, Some Answers</h2>
                    <div className="button-container">
                        <div className="button-box">
                            <button type="button" className="btn color rounded-pill mb-2 special-button nav-link btn-general" onClick={toggleGeneralQuestions}>General</button>
                            <button type="button" className="btn color rounded-pill mb-2 special-button nav-link btn-payment" onClick={togglePaymentQuestions}>Payment</button>
                            <Link to="/contact" style={{ textDecoration: 'none' }}><button type="button" className="btn color rounded-pill mb-2 special-button nav-link btn-other">Other</button></Link>
                        </div>
                    </div>
                    <ul className="general-questions" style={{ display: generalQuestionsVisible ? 'block' : 'none' }}>
                        <li>
                            What makes our platform special?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Freelanzo uniquely integrates freelancers, trainers, and clients in one dynamic community, offering live portfolios, specialized workshops, and a customizable user experience.</div>
                        </li>
                        <li>
                            How can I sign up on the site?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Signing up is easy! Just click on the "Sign Up" button at the top of the page and follow the instructions to create your new account.</div>
                        </li>
                        
                        <li>
                            How can I reset my password if I forget it?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>You can reset your password by clicking on the "Forgot Password?" link on the login page and following the prompts to receive a reset link to your registered email.</div>
                        </li>
                        <li>
                            How can I customize my experience on the platform?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Customize your experience by updating your profile preferences, setting your communication preferences, and using our interactive dashboard to manage what you see first.</div>
                        </li>
                    </ul>

                    <ul className="payment-questions" style={{ display: paymentQuestionsVisible ? 'block' : 'none' }}>
                        <li>
                            Comment puis-je effectuer un paiement?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Réponse à la question 1.</div>
                        </li>

                        <li>
                            Quelles méthodes de paiement acceptez-vous?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Réponse à la question 1.</div>
                        </li>
                        <li>
                            Comment puis-je mettre à jour les informations de ma carte de crédit?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Réponse à la question 2.</div>
                        </li>
                        <li>
                            Y a-t-il des frais supplémentaires pour certaines options de paiement?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Réponse à la question 3.</div>
                        </li>
                        <li>
                            Comment puis-je obtenir une facture pour mes transactions?
                            <span className="plus-sign">+</span>
                            <div className="answer" style={{ display: 'none' }}>Réponse à la question 3.</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mb-5"></div>
            <div className="container py-5 text-center">
                <h2 className="section-title">Thanks</h2>
                <p className="section-description">We sincerely thank you for visiting our platform. We are delighted to have you with us.</p>

            </div>
            <div className="mb-5"></div>

            <Footer />
        </div>
    );
}

export default Home;
