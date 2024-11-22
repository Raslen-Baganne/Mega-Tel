import React, { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import { FaUserEdit, FaPhoneAlt,FaLock } from "react-icons/fa";
import Select from 'react-select';
import { SlCalender } from "react-icons/sl";

import './Register.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'German', label: 'German' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Japanese', label: 'Japanese' },
];

function Register() {
    const navigate=useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: new Date().toISOString().substr(0, 10), // Initialize with today's date
        languages: [], // Initialize with an empty array
        phoneNumber: ''
        // Add other fields as needed
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [t] = useTranslation();
    const handleSelectChange = (selectedOptions) => {
        // Map selectedOptions to extract values and update data.languages
        const selectedValues = selectedOptions.map(option => option.value);
        setData({
            ...data,
            languages: selectedValues
        });
    };
    

    const customStyles = {
        control: (provided) => ({
            ...provided,
            '&:hover': {
                borderColor: '#e78a00',
            },
            '&:focus': {
                borderColor: '#e78a00',
                borderRadius: '40px',
                boxShadow: '0 0 0 1px #e78a00',
            },
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, .2)',
            outline: 'none',
            borderRadius: '40px',
            boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#333',
            fontWeight: '700',
            padding: '12px 20px',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#fff',
            fontFamily: 'Sans-serif',
            fontSize: '16px',
        }),
        multiValue: (provided) => ({
            ...provided,
            borderRadius: '40px',

        }),
        multiValueLabel: (provided) => ({
            ...provided,
            fontSize: '20px',
            color: '#333',
            fontWeight: '700',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            cursor: 'pointer',

        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '16px',
            padding: '2px 20px',
            color: state.isSelected ? '#e78a00' : provided.color,
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '10px',
            color: '#333',
        }),
    };
    const  registerUser = async(e) =>{
        e.preventDefault()
        const {  name,email, password, dateOfBirth, languages, phoneNumber  } = data
        try {
            const{data} = await axios.post('/register',{
                name,email, password, dateOfBirth, languages, phoneNumber 
             })
             if (data.error){
                toast.error(data.error)
             }
             else{
                setData({})
                toast.success('Login Successful. Welcome! ')
                navigate('/login')
             }
        } catch (error) {
            console.log(error)

            
        }
      }

    return (
        <React.Fragment>

            <div className='costum-login-body'>
                <div className='costum-wrapper'>
                    <form onSubmit={registerUser}>
                        <h1>{t('reg')}</h1>
                        <div className="costum-input-box">
                            <input type="text" placeholder={t('FN')}  value={data.name} onChange={(e)=>setData({...data , name:e.target.value})}/>
                            <FaUserEdit className='costum-icon' />
                        </div>
                        <div className="costum-input-box">
                            <input type="email" placeholder={t('EMAIL')}  value={data.email} onChange={(e)=>setData({...data , email:e.target.value})}/>
                            <MdOutlineMail className='costum-icon' />
                        </div>
                        
                        <div className="costum-input-box">
                <input type="password" placeholder={t('pwd')} value={data.password} onChange={(e)=>setData({...data , password:e.target.value})} />
                <FaLock className='costum-icon' />
              </div>


                        <div className="costum-input-box">
                            <label htmlFor="Birth"></label>
                            <input id='Birth' type="date"  value={data.dateOfBirth} onChange={(e)=>setData({...data , dateOfBirth:e.target.value})} />

                            <SlCalender className='costum-icon' />
                        </div>
                        <div className="costum-input-box">
                        <Select
                                defaultValue={data.languages.map(lang => ({ value: lang, label: lang }))}
                                isMulti
                                name="languages"
                                options={languageOptions}
                                className="costum-basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                placeholder={t('SL')}
                                styles={customStyles}
                            />
                        </div>
                        <div className="costum-input-box">
                            <input type="tel" id="phoneNumber" placeholder={t('phoneNumber')}  value={data.phoneNumber} onChange={(e)=>setData({...data , phoneNumber:e.target.value})}/>
                            <FaPhoneAlt className='costum-icon' />
                        </div>

                        <button type="submit" className='costum-login-button'>{t('reg')}</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;
