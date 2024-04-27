import React, { useState, useEffect } from 'react';
import '../AcceuilFreelancer/AcceuilFreelancer.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BellIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SearchIcon from '@mui/icons-material/Search';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const AcceuilFormateur = () => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const navigate=useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token');
        const usertype = localStorage.getItem('usertype');

        if (!token  && usertype!=="Formateur") {
            // Redirect to '/'
            navigate('/');
        }
        else {//chnouwa bech yjih fel acceuil
            axios.get('http://localhost:5000/formateurGetPostesClients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                   console.log(response.data);
                   setPosts(response.data);
                })
                .catch(error => {
                    // Handle error
                });
                axios.get('http://localhost:5000/getAnnonces', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                       console.log(response.data);
                       setPosts(response.data);
                    })
                    .catch(error => {
                        // Handle error
                    });
        }
        const searchContainerClickHandler = () => {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('clicked');
            document.getElementById('searchInput').focus();
        };

        const searchIconClickHandler = () => {
            const searchContainer = document.getElementById('searchContainer');
            searchContainer.classList.toggle('show-input');
            if (searchContainer.classList.contains('show-input')) {
                document.getElementById('searchInput').focus();
            }
        };

        const searchContainer = document.getElementById('searchContainer');
        const searchIcon = document.getElementById('searchIcon');

        searchContainer.addEventListener('click', searchContainerClickHandler);
        searchIcon.addEventListener('click', searchIconClickHandler);

        return () => {
            searchContainer.removeEventListener('click', searchContainerClickHandler);
            searchIcon.removeEventListener('click', searchIconClickHandler);
        };
    }, []);


    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };




    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        const form = document.getElementById("projectForm");

        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
    };

    const closeForm = () => {
        document.getElementById("projectForm").style.display = "none";
        setIsFormOpen(false); // Also set isFormOpen state to false
    };

    const submitForm = (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way
const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    if (endDate < startDate) {
        alert("End date must be after start date.");
        return;
    }
        // Extract form data
        const domain = document.getElementById('domain').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        // Create a new post object
        const newPost = {
            domain,
            description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            price
        };

        // Add the new post to the beginning of the posts array
        setPosts([newPost, ...posts]);

        // Close the form and reset the form fields
        closeForm();
        //event.target.reset();
    };

    const toggleSidebar = () => {
        // setIsSidebarOpen(prev => !prev);// Update isSidebarOpen state
        const body = document.querySelector("body");
        const sidebar = body.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    };

    const toggleModeSwitch = () => {
        setIsDarkMode(!isDarkMode);
        const body = document.querySelector("body");
        const modeText = body.querySelector(".mode-text");

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Dark Mode";
        } else {
            modeText.innerText = "Light Mode";
        }
    };
    const handleLogout = async () => {
        console.log("hi")
        // Clear authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');
        
        // Redirect to a specific location, such as '/'
        navigate('/');
    };

    const toggleDetails = (post) => {
        setModalData({
            title: post.activity,
            domain: post.domain,
            description: post.description,
            startDate: post.startDate,
            endDate: post.endDate,
            price: post.price
        });
        setShowModal(true);
    };


    const closeModal = () => {
        setShowModal(false);
    };
    const gotoprofile =async ()=> {
        
        navigate("/profileFormateur");
    } 
    return (
        <div className='acceuil'>
            <div className='menu1'>
                <nav className="sidebar close ">
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src={require('../images/logo.png')} alt="logo" />
                            </span>
                            <div className="text header-text">
                                <span className="name">Freelanzo</span>
                            </div>
                        </div>
                        <ChevronRightIcon className='toggle' onClick={toggleSidebar} />
                    </header>
                    <div className="menu-bar">
                        <div className="menu">
                            <ul className="menu-links">
                                <li className="nav-link">
                                    <a href="#">
                                        <HomeIcon className='icon' />
                                        <span className="text nav-text">Home</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a onClick={gotoprofile}>
                                        <AccountCircleIcon className='icon' />
                                        <span className="text nav-text">Profile</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <ChatIcon className='icon' />
                                        <span className="text nav-text">Conversations</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#" onClick={toggleForm}>
                                        <AddCircleIcon className='icon' />
                                        <span className="text nav-text">Add Annonce</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                        <HelpIcon className='icon' />
                                        <span className="text nav-text">Help</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-content">
                            <li className="nav-link">
                                <a  onClick={handleLogout} >
                                    <LogoutIcon className='icon' />
                                    <span className="text nav-text">Logout</span>
                                </a>
                            </li>
                            <li className="mode" onClick={toggleModeSwitch}>
                                {isDarkMode ? (
                                    <>
                                        <DarkModeIcon className='icon' />
                                        <span className="mode-text text">Dark Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <LightModeIcon className='icon' />
                                        <span className="mode-text text">Light Mode</span>
                                    </>
                                )}
                                <div className="toggle-switch">
                                    <span className={`switch ${isDarkMode ? 'dark' : 'light'}`} />
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
                {isFormOpen && (
                    <div className="form-container">
                        <form id="addProjectForm">
                            {/* Your form elements */}
                            <button type="submit">Submit</button>
                            <button type="button" onClick={closeForm}>Cancel</button>
                        </form>
                    </div>
                )}
                <section className="home">

                    <div className="top-buttons">

                        <button id="button1">Inspiration</button>
                        <button id="button2">Find Talents</button>


                        <div id="notification" className="notification-icon">
                            <BellIcon />
                        </div>
                        <div id="fullscreen" className="fullscreen-icon" onClick={toggleFullScreen}>
                            <FullscreenIcon />
                        </div>

                        <div className="search" id="searchContainer">
                            <SearchIcon id="searchIcon" />
                            <input type="text" name="search" placeholder="Search.." id="searchInput" />
                        </div>

                    </div>
                    <div className="container1">
                        <p>Embark on a creative journey,<br />
                            Dive into a world of top freelancers,<br />
                            learn the art of freelancing,<br />
                            and showcase your skills.<br /></p>
                    </div>
                    {/* Form section */}
                    <div id="projectForm" className="form-container">
                        <form id="addProjectForm">
                            {/*<label htmlFor="activity">Activity:</label>
                        <input type="text" id="activity" name="activity" required />*/}

                            <label htmlFor="domain">Domain:</label>
                            <select id="domain" name="domain" required>
                                <option value="">Select Domain</option>
                                <option value="Programming">Programming</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Software Development">Software Development</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Content Writing">Content Writing</option>
                                <option value="Project Management">Project Management</option>
                                <option value="Business Analysis">Business Analysis</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                            </select>
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="datetime-local" id="startDate" name="startDate" required />

                            <label htmlFor="endDate">End Date:</label>
                            <input type="datetime-local" id="endDate" name="endDate" required />

                            <label htmlFor="mode">Mode of Delivery:</label>
                            <select id="mode" name="mode" required>
                                <option value="">Select Mode</option>
                                <option value="Online">Online</option>
                                <option value="In Person">In Person</option>
                            </select>

                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" required></textarea>

                            <label htmlFor="price">Price ($):</label>
                            <input type="number" id="price" name="price" required min="0" step="0.01" />

                            <button type="submit" onClick={submitForm}>Submit</button>
                            <button type="button" onClick={closeForm}>Cancel</button>

                        </form>
                    </div>

                    {/* Post container */}
                    <div className="post-container">
                        {posts.map((post, index) => {
                            //console.log(post);  // Check what each 'post' contains
                            return (
                                <div key={index} className="post">
                                <div><strong>Domain:</strong> {post.domain}</div>
                                <h2><strong>Start Date:</strong> {post.startDate}</h2>
                                <h2><strong>Price:</strong> {post.price}</h2>



                                    
                                    <div className="see-more">
                                        <button type='button' onClick={() => toggleDetails(post)}>See More</button>
                                    </div>
                                </div>
                            );
                        })}



                    </div>

                    {/* Load More button */}
                    <a href="#" className="myButton">Load More</a>

                    {/* Copyright section */}
                    <div id="copy" className="copyright-section text-center">
                        <p>&copy; 2024 Eya Eyouta. Tous droits réservés.</p>
                    </div>

                    {/* Details modal */}
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>Domain:</h2>
                                <p>{modalData.domain}</p>
                                <h5>Start Date:</h5>
                                <p>{modalData.startDate}</p>
                                <h5>End Date:</h5>
                                <p>{modalData.endDate}</p>

                                <h2>Description:</h2>
                                <p>{modalData.description}</p>
                                
                                <h5>Price:</h5>
                                <p>{modalData.price}</p>


                            </div>
                        </div>
                    )}

                </section>
            </div>
        </div>
    );


}

export default AcceuilFormateur;