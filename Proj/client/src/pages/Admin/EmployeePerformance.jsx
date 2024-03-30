import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './EmployeePerformance.css';
import './fonts.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function EmployeePerformance() {
    const location = useLocation();
    const user = location.state.name;
    const employeeInfo = location.state.info
    const navigate = useNavigate();


    const menuItems = [
        { name: "Employee Development", icon: faHouse, margin: 0, path: "/dashboard" },
        { name: "Assess Feedback", icon: faFileArrowDown, margin: 12, path: "/assess_feedback" },
        { name: "Create Assessment", icon: faFileArrowUp, margin: 10, path: "/create_assessment" },
        { name: "Employee Data", icon: faStreetView, margin: 3, path: "/employee_data" },
        { name: "Settings", icon: faGear, margin: 5, path: "/admin_settings" }
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [employees, setEmployees] = useState([
        { id: 1, role: "Manager", age: 30, contact: "123-456-7890", hoursWorked: 40, status: "Active" }
    ]);
    const [newEmployeeData, setNewEmployeeData] = useState({
        role: "",
        age: "",
        contact: "",
        hoursWorked: "",
        status: ""
    });
    const [showModal, setShowModal] = useState(false);

    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
    };


    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: { name: user } });
    };

    const addEmployee = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewEmployeeData({
            role: "",
            age: "",
            contact: "",
            hoursWorked: "",
            status: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newEmployeeData);
        const newEmployee = {
            id: employees.length + 1,
            ...newEmployeeData
        };
        setEmployees([...employees, newEmployee]);
        closeModal();
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };


    const ProgressBar = (props) => {
        const { bgcolor, completed } = props;

        let barColor = bgcolor
        if(completed < 60){
            barColor = "red"
        }else if(completed < 80){
            barColor = "orange"
        }

        const containerStyles = {
            height: 20,
            width: '25vw',
            backgroundColor: "#e0e0de",
            borderRadius: 20,
            margin: 50
        }

        const fillerStyles = {
            height: '100%',
            width: `${completed}%`,
            backgroundColor: barColor,
            borderRadius: 'inherit',
            textAlign: 'right'
        }

        const labelStyles = {
            color: 'white',
            fontWeight: 'bold'
        }

        return (
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}>{`${completed}%`}</span>
                </div>
            </div>
        );
    };

    const [positionTitles, setPositionTitles] = useState([]);
    const [courses, setCourses] = useState([])
    const [workshops, setWorkshops] = useState([])


    useEffect(() => {
        axios.get('/dashboard-position-titles')
            .then(res => {
                setPositionTitles(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to fetch position titles');
            });

        axios.get('/dashboard-course-data')
            .then(res => {
                console.log(res.data)
                setCourses(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to fetch courses')
            });

        axios.get('/dashboard-workshop-data')
            .then(res => {
                console.log(res.data)
                setWorkshops(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to fetch workshops')
            })
    }, []);

    // function to convert positionID to position title
    const getPositionTitle = (positionID) => {
        const position = positionTitles.find(position => position.positionID === positionID);
        return position ? position.title : "Unknown";
    };

    const getPositionalCourses = (positionID) => {
        const position = positionTitles.find(position => position.positionID === positionID);

        return position ? position.courses : []
    }
    const getPositionalWorkshops = (positionID) => {
        const position = positionTitles.find(position => position.positionID === positionID);
        return position ? position.workshops : []
    }

    const getCourseTitle = (courseID) => {
        const course = courses.find(course => course.courseID === courseID)
        return course ? course.title : []
    }

    const getWorkshopTitle = (workshopID) => {
        const workshop = workshops.find(workshop => workshop.workshopID === workshopID)
        return workshop ? workshop.title : []
    }


    const getCourseCompletion = (()=>{
        const requiredCourses = getPositionalCourses(employeeInfo.positionID).map((courseID)=>getCourseTitle(courseID))
        const coursesTaken = employeeInfo.courses_taken

        if(requiredCourses.length == 0)
        {
            return 1
        }


        let progress = 0
        for(const course of requiredCourses){
            if(coursesTaken.includes(course))
            {
                progress++
            }
        }

        return (progress/requiredCourses.length)


    })

    const getWorkshopCompletion = (()=> {
        const requiredWorkshops = getPositionalWorkshops(employeeInfo.positionID).map((workshopID)=>getWorkshopTitle(workshopID))
        const workshopsTaken = employeeInfo.workshops_taken


        if(requiredWorkshops.length == 0)
        {
            return 1;
        }


        let progress= 0
        for(const workshop of requiredWorkshops){
            if(workshopsTaken.includes(workshop))
            {
                progress++
            }
        }

        return (progress/requiredWorkshops.length)

    })

    const getAge = (dateOfBirth) => {
        if (!dateOfBirth) return "Unknown";
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };


    const performanceIndicators = [
        { name: 'Attendance Rate', score: employeeInfo.attendance_rate * 100 },
        { name: 'Punctuality Score', score: employeeInfo.punctuality * 100 },
        { name: 'Work Ethic Score', score: employeeInfo.efficiency * 100 },
        { name: 'Task Completion Rate', score: employeeInfo.task_completion_rate * 100 },
        { name: 'Workshop Completion Rate', score: getWorkshopCompletion()*100 },
        { name: 'Course Completion Rate', score: getCourseCompletion()*100 },
        { name: 'Professional Development', score: employeeInfo.professionalism * 100 },
        { name: 'Leadership skills', score: employeeInfo.leadership * 100 },
        { name: 'Collaboration skills', score: employeeInfo.collaboration * 100 }

    ]



    return (
        <div className='overlay'>
            <div className='wrapper'>
                <div className='sidebar'>
                    <div className="logo">
                        <div>
                            <div className="logo-icon-container">
                                <FontAwesomeIcon icon={faBuilding} size="4x" color='rgb(34,137,255)' />
                            </div>
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="menu">
                        {menuItems.map(item => (
                            <div key={item.name} className={isActive(item.path) ? "active" : ""}>
                                <FontAwesomeIcon icon={item.icon} className={isActive(item.path) ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                <a href="" onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='contentPerf'>
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/aboutAdmin', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="">{user}</a>
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
                    <div className='employeeInfo'>
                        <div className='employeeHeading' style={{ marginBottom: "20px" }} >Employee Information</div>
                        <div>
                            <div>
                                <div className='infoType'>Employee ID</div>
                                <div className='infoContainer' style={{ marginLeft: "27px" }} >{employeeInfo.employeeID}</div>
                            </div>
                            <div>
                                <div className='infoType'>Age</div>
                                <div className='infoContainer' style={{ marginLeft: "43px" }} >{getAge(employeeInfo.date_of_birth)}</div>
                            </div>
                            <div>
                                <div className='infoType'>Qualification</div>
                                <div className='infoContainer'>{employeeInfo.education[0]}</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='infoType'>Name</div>
                                <div className='infoContainer' style={{ marginLeft: "75px" }}>{employeeInfo.name}</div>
                            </div>
                            <div>
                                <div className='infoType'>Contact</div>
                                <div className='infoContainer'>{employeeInfo.contactNumber}</div>
                            </div>
                            <div>
                                <div className='infoType'>Role</div>
                                <div className='infoContainer' style={{ marginLeft: "70px" }}>{getPositionTitle(employeeInfo.positionID)}</div>
                            </div>
                        </div>
                    </div>
                    <div className='employeePerformance'>
                        <div className='employeeHeading' style={{ marginTop: "0px" }}>Employee Performance</div>
                        <div className='kpiContainer'>
                            {performanceIndicators.map((kpi) => (
                                <div className='kpiNameBar'>
                                    <div>{kpi.name}</div>
                                    <div className='progressBar'>
                                        <ProgressBar bgcolor='#30E257' completed={kpi.score} />
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}