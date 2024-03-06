import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import './Signup.css'
import img1 from './img/s_img1.png'
import img2 from './img/s_img2.png'
import img3 from './img/s_img3.png'
import img4 from './img/s_img4.png'
import img5 from './img/s_img5.png'
import img6 from './img/s_img6.png'
import img7 from './img/s_img7.png'
import img8 from './img/s_img8.png'
import img9 from './img/s_img9.png'
import img10 from './img/s_img10.png'

export default function Signup() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        empID: '',
        s_img: 0
    })

    const imgSources = [[img1, 1], [img2, 2], [img3, 3], [img4, 4], [img5, 5], [img6, 6], [img7, 7], [img8, 8], [img9, 9], [img10, 10]]
    const [randomizedImages, setRandomizedImages] = useState(imgSources);

    const sequenceImg = (list) => {
        let array = [...list]
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        setRandomizedImages(sequenceImg([...imgSources]));
    }, []);

    const [step, setStep] = useState(1)

    const [step2data, setStep2Data] = useState({
        phone: '',
        dob: "2006-01-01",
        gender: '',
        education: '',
        certifications: [""],
        awards: [""],
        profilePicture: null,
        })

    const [step3data, setStep3Data] = useState({
        // security questions for password recovery
        question: '',
        answer: ''
        })

    const fetchData = async (e) => {
        const { name, email, password, empID, s_img } = data
        try {
            const resp = await axios.post('/registerUser', {
                name, email, password, empID, s_img
            })
            if (resp.data.error) {
                toast.error(resp.data.error)
                setData({ ...data, name: '' })
            } else {
                toast.success('Employee record found')
                setData({ ...data, name: resp.data.name })
                setTimeout(() => setRandomizedImages(sequenceImg([...imgSources])), 0)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const searchRecord = async () => {
        try {
            const { name, email, password, empID, s_img } = data

            if (empID.trim() == '') {
                toast.error('Employee id missing')
            } else {
                await fetchData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const registerUserStep1 = async (e) => {
        e.preventDefault();
        try {
            toast.success('Step 1 Successful!')
            // go to next step
            setStep(2)
        } catch (error) {
            console.log(error)
        }
    }

    
    const registerUserStep2 = async (e) => {
        e.preventDefault();
        try {            
            toast.success('Step 2 Successful!')
            // navigate('/login')
            // go to next step
            setStep(3)
            
        } catch (error) {
            console.log(error)
        }
    }

    const registerUserStep3 = async (e) => {
        e.preventDefault();
        const {question, answer} = step3data
        // merge data from step 1 and step 2 and step 3
        const mergedData = {...data, ...step2data, ...step3data}
        console.log("Meged data:", mergedData);
        try {
            const {data} = await axios.post('/signup', mergedData)
            if (data.error) {
                toast.error(data.error)
            } else {
                setStep3Data({})
                toast.success('Signup Successful!')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <body>
          <div class="signup-container">
            <div class="signup-box">
              <h1>Employee Registration</h1>
              {step === 1 && (
              <form onSubmit={registerUserStep1}>
                <div class="input-group">
                  <input type="text" placeholder='Employee ID' value={data.empID} onChange={(e) => setData({...data, empID: e.target.value})}/>
                  <button type="button" onClick={searchRecord} className="search-btn"><FaSearch />
                  </button>
                </div>
    
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => {/* Handle changes if needed */}}
                  disabled={true} // This makes the input non-interactive
                  style={{ color: 'grey' }} // This styles the placeholder and value color
                />
              </div>
    
    
                <div class="input-group">
                  <input type="email" placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                </div>
    
                <div class="input-group">
                  <input type="password" placeholder='Password (6 or more characters)' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                </div>
    
    
                <div className="security-image-selection">
                      <p>Select security image </p>
                      <div className="security-images">
                        <img src={randomizedImages[0][0]} alt="Security Icon 1" className={`security-image ${data.s_img === randomizedImages[0][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[0][1]})} />
                        <img src={randomizedImages[1][0]} alt="Security Icon 2" className={`security-image ${data.s_img === randomizedImages[1][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[1][1]})} />
                        <img src={randomizedImages[2][0]} alt="Security Icon 3" className={`security-image ${data.s_img === randomizedImages[2][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[2][1]})} />
                        <img src={randomizedImages[3][0]} alt="Security Icon 4" className={`security-image ${data.s_img === randomizedImages[3][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[3][1]})} />
                        <img src={randomizedImages[4][0]} alt="Security Icon 5" className={`security-image ${data.s_img === randomizedImages[4][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[4][1]})} />
                      </div>
                      <div className="security-images">
                        <img src={randomizedImages[5][0]} alt="Security Icon 1" className={`security-image ${data.s_img === randomizedImages[5][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[5][1]})} />
                        <img src={randomizedImages[6][0]} alt="Security Icon 2" className={`security-image ${data.s_img === randomizedImages[6][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[6][1]})} />
                        <img src={randomizedImages[7][0]} alt="Security Icon 3" className={`security-image ${data.s_img === randomizedImages[7][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[7][1]})} />
                        <img src={randomizedImages[8][0]} alt="Security Icon 4" className={`security-image ${data.s_img === randomizedImages[8][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[8][1]})} />
                        <img src={randomizedImages[9][0]} alt="Security Icon 5" className={`security-image ${data.s_img === randomizedImages[9][1] ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: randomizedImages[9][1]})} />
                      </div>
                </div>
    
                <div class="input-group">
                  <button type="submit" class="signup-btn">Proceed to Step 2 of 3</button>
                </div>
              </form>
            //   End of step 1
                )} 
    
                {step === 2 && (
                    // Step 2: Gather additional information such as phone number, date of birth, education, certifications, and awards   
                    <form onSubmit={registerUserStep2}> 
                        <div class="input-group">
                            <input type="text" placeholder='Phone' required value={step2data.phone} onChange={(e) => setStep2Data({...step2data, phone: e.target.value})}/>
                        </div>   
    
        
                        <div class="input-group">
                            <label>Date of Birth:</label>
                            <input type="date" placeholder='Date of Birth' required value={step2data.dob} onChange={(e) => setStep2Data({...step2data, dob: e.target.value})}/>
                        </div>
        
                        <div class="input-group">
                            <input type="text" placeholder='Education' value={step2data.education} onChange={(e) => setStep2Data({...step2data, education: e.target.value})}/>
                        </div>
    
                        <div className="input-group">
                            <label>Certifications:</label>
                            {step2data.certifications.map((certification, index) => (
                                <div key={index} className="certification-input">
                                <input
                                    type="text"
                                    required
                                    placeholder={`Certification ${index + 1}`}
                                    value={certification}
                                    onChange={(e) => {
                                    const newCertifications = [...step2data.certifications];
                                    newCertifications[index] = e.target.value;
                                    setStep2Data({ ...step2data, certifications: newCertifications });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => {
                                    const newCertifications = [...step2data.certifications];
                                    newCertifications.splice(index, 1);
                                    setStep2Data({ ...step2data, certifications: newCertifications });
                                    }}
                                >
                                    -
                                </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="add-btn"
                                onClick={() => setStep2Data({ ...step2data, certifications: [...step2data.certifications, ""] })}
                            >
                                +
                            </button>
                        </div>
    
                        <div className="input-group">
                            <label>Awards:</label>
                            {step2data.awards.map((award, index) => (
                                <div key={index} className="award-input">
                                <input
                                    type="text"
                                    required
                                    placeholder={`Award ${index + 1}`}
                                    value={award}
                                    onChange={(e) => {
                                    const newAwards = [...step2data.awards];
                                    newAwards[index] = e.target.value;
                                    setStep2Data({ ...step2data, awards: newAwards });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => {
                                    const newAwards = [...step2data.awards];
                                    newAwards.splice(index, 1);
                                    setStep2Data({ ...step2data, awards: newAwards });
                                    }}
                                >
                                    -
                                </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="add-btn"
                                onClick={() => setStep2Data({ ...step2data, awards: [...step2data.awards, ""] })}
                            >
                                +
                            </button>
                        </div>
    
        
                        <div class="input-group">
                            <button type="submit" class="signup-btn">Proceed to Step 3 of 3</button>
                        </div>
                    </form>
                )}
    
                {/* Step 3: Security questions for password recovery */}
                {step === 3 && (    
                    <form onSubmit={registerUserStep3}>
                        <div class="input-group">
                            <input type="text" placeholder='Security Question' required value={step3data.question} onChange={(e) => setStep3Data({...step3data, question: e.target.value})}/>
                        </div>
        
                        <div class="input-group">
                            <input type="text" placeholder='Answer' required value={step3data.answer} onChange={(e) => setStep3Data({...step3data, answer: e.target.value})}/>
                        </div>
        
                        <div class="input-group">
                            <button type="submit" class="signup-btn">Register</button>
                        </div>
                    </form>
                )}
    
    
            </div>
          </div>
        </body>
      )
    }
    