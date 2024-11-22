import './LoginForm.css';
import { FaRegUser, FaLock } from "react-icons/fa";

import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
// axios.defaults.baseURL ='http://localhost:8000';
// axios.defaults.withCredentials = true;


import { loginUser } from '../../../redux/apiCalls/authApiCall';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function LoginForm() {
  const navigate = useNavigate();
//   const[data,setData] = useState({
//     name : '',
//     password: '',
// });




  const { t } = useTranslation();

  // const  loginUser = async(e) =>{
  //   e.preventDefault()
  //   const{ name , password } = data
  //   try {
  //     const{data}= await axios.post('/login',{
  //       name,
  //       password

  //     });
  //     if (data.error){
  //       toast.error(data.error)
  //     }
  //     else{
  //       setData({});
  //       navigate('/dash');
  //       toast.success('login done')
  //     }
  //   } catch (error) {
      
  //   }
  // }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux useDispatch
  const dispatch = useDispatch();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') return toast.error('Veuillez remplir tous les champs du formulaire.');
    if (password.trim() === '') return toast.error('Veuillez remplir tous les champs du formulaire.');
    dispatch(loginUser({ email, password }));
  };



  return (
    <React.Fragment>
            <ToastContainer />
      <div className='costum-login-body'>
        <div className='costum-wrapper'>
          <div className="costum-login-container slide-in">

            <form  onSubmit={handleSubmit}>
              <h1>{t('log')}</h1>
              <div className="costum-input-box">
                <input type="text" placeholder={t('user')}  value={email}    required     onChange={(e) => setEmail(e.target.value)}/>
                <FaRegUser className='costum-icon' />
              </div>
              <div className="costum-input-box">
                <input   type="password" id="password" placeholder={t('pwd')}  value={password}
              onChange={(e) => setPassword(e.target.value)} />
                <FaLock className='costum-icon' />
              </div>
              <div className="costum-remember-forgot">
                <label>
                  <input type="checkbox" />
                  {t('reme')}
                </label>
                <Link to="#">{t('forgot')}</Link>
              </div>
              <button type="submit" className='costum-login-button'>{t('log')}</button>
              <div className="costum-register-link">
                <p>{t('donthaveacount')} <Link to="/Register">{t('reg')}</Link></p>

              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;
