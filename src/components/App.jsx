import React, { Profiler, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup/Signup';
import User from './User/User';
import Languages from './Languages/Languages';
import Job from './Job/Job';
import JobDescription from './JobDescription/JobDescription';
import Journey from './Journey/Journey';
import Skills from './Skills/Skills';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Signin from './Signin/Signin';
import Interests from './Interests/Interests';
import ProfileFreelancer from './Profile/ProfileFreelancer';
import ProfileClient from './Profile/ProfileClient';
import ProfileFormateur from './Profile/ProfileFormateur';
import Freelancer from './Freelancer/Freelancer';
import Portfolio from './Freelancer/Portfolio';
import Getintouch from './Freelancer/Getintouch';
import AcceuilFreelancer from './AcceuilFreelancer/AcceuilFreelancer';
import AcceuilFormateur from './AcceuilFormateur/AcceuilFormateur';
import AcceuilClient from './AcceuilClient/AcceuilClient';
import Card from './CardProfile/Card';
import Reviews from './Reviews/Reviews';
import Success from './successfulsignup/success';
import FormationInscrire from './FormationInscrire/FormationInscrire';
import PaymentForm from './PaymentForm/PaymentForm';
import Cardcl from "./CardProfileClient/Cardcl";
import Cardfo from "./CardProfileFormateur/Cardfo";
import Apply from './Apply/Apply';
import Email from './AcceuilClient/EmailContact';
import PaymentClient from './PaymentForm/PaymentFormClient';
import Coverletter from './AcceuilClient/Coverletter';
import { useNavigate } from 'react-router-dom';







const App = () => {
    const navigate=useNavigate();
   
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element={<User />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/job" element={<Job />} />
            <Route path="/jobdescription" element={<JobDescription />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/profilefreelancer" element={<ProfileFreelancer />} />
            <Route path="/profileclient" element={<ProfileClient />} />
            <Route path="/profileFormateur" element={<ProfileFormateur />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/getintouch" element={<Getintouch />} />
            <Route path="/acceuilfreel" element={<AcceuilFreelancer />} />
            <Route path="/acceuilformateur" element={<AcceuilFormateur />} />
            <Route path="/acceuilcl" element={<AcceuilClient />} />
            <Route path="/cardprofile" element={<Card />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/success" element={<Success />} />
            <Route path="/inscritFormation" element={<FormationInscrire />} />
            <Route path="/pay" element={<PaymentForm />} />
            <Route path="/cardprofilecl" element={<Cardcl />} />
            <Route path="/cardprofilefo" element={<Cardfo />} />
            <Route path='/apply' element={<Apply />} />
            <Route path='/email' element={<Email />} />
            <Route path='/paycl' element={<PaymentClient />} />
            <Route path='/coverletter' element={<Coverletter />} />







        </Routes>
    );
}

export default App;
