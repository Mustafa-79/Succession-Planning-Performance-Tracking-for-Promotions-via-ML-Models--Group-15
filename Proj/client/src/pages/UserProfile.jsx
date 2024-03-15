import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';
import defaultImg from './img/profile-default.svg'
import './fonts.css';

export default function UserProfile() {
    const location = useLocation();
    const user = location.state.name;
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        position: '',
        email: '',
        contactNumber: '',
        gender: '',
        employeeID: ''
    })

    useEffect(() => {
        fetchData(); // Call the fetch function on component mount
    }, []); // Empty array means it will only run once when component mounts

    const fetchData = async (e) => {
        const { name, email, password, empID, s_img } = data
        try {
            const resp = await axios.post('/getProfile', {
                name: user
            })
            if (resp.data.error) {
                setData({})
            } else {
                setData({name: resp.data.record1.name, position: resp.data.record2.title, email: resp.data.record1.email, contactNumber: resp.data.record1.contactNumber, gender: resp.data.record1.gender, employeeID: resp.data.record1.employeeID })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const menuItems = [
        { name: "Career Path", icon: faHouse, margin: 0, path: "/employeeDashboard" },
        { name: "Personal Development Plans", icon: faFileArrowDown, margin: 4, path: "/developmentPlans" },
        { name: "Feedback Tools", icon: faFileArrowUp, margin: 7, path: "/feedbackForm" },
        { name: "Settings", icon: faGear, margin: 0, path: "/employeeSettings" }
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");

    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: {name: user}}); 
    };

    const userData = {
        firstName: 'Nicolas',
        lastName: 'Henry',
        department: 'Web Development',
        email: 'nicolas@geekytechie.com',
    };
    

    return (
        <div className='overlay'>
            <div className='wrapper'>
                <div className='sidebar'>
                    <div className="logo">
                        <div>
                            <div className="logo-icon-container">
                                <FontAwesomeIcon icon={faBuilding} size="4x" color='rgb(34,137,255)' />
                            </div>
                            <span>Employee</span>
                        </div>
                    </div>
                    <div className="menu">
                        {menuItems.map(item => (
                            <div key={item.name} className={activeMenuItem === item.name ? "active" : ""}>
                                <FontAwesomeIcon icon={item.icon} className={activeMenuItem === item.name ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                <a href="" onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/about', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="" onClick={(e) => handleMenuItemClick('/UserProfile', e)}>{user}</a>
                        <button
                            onClick={(e) => handleMenuItemClick('/login', e)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                    <div class="profile-header">
                        <img src={defaultImg} alt="Profile Image" class="profile-image"/>
                    </div>
                    <div class="profile-settings">
                        <h1>User Profile</h1>
                        <form>
                            <label for="empID">Employee ID</label>
                            <input 
                                type="text"
                                value={data.employeeID}
                                disabled={true}
                            />

                            <label for="name">Name</label>
                            <input 
                                type="text"
                                value={data.name}
                                disabled={true}
                            />

                            <label for="position">Position Title</label>
                            <input 
                                type="text"
                                value={data.position}
                                disabled={true}
                            />
                            
                            <label for="email">Email</label>
                            <input 
                                type="email"
                                value={data.email}
                                disabled={true}
                            />

                            <label for="contact">Contact No.</label>
                            <input 
                                type="text"
                                value={data.contactNumber}
                                disabled={true}
                            />

                            <label for="gender">Gender</label>
                            <input 
                                type="text"
                                value={data.gender}
                                disabled={true}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}