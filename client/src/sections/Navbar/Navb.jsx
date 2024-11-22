import './Navb.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../Assets/images/a1.png'; // Import the logo image
import LanguageSelector from '../../components/languages/LanguageSelector';
import { useTranslation } from 'react-i18next';

function Navb() {
  const { t } = useTranslation();

  // Function to handle navigation link clicks and scroll to the top
  const handleNavLinkClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };


  
  return (
    <header className="costum-header">
      <a href="/Home" className="costum-costum-logo">
        <img src={logoImage} alt="Logo"></img>
      </a>
      <div>
        <nav className="costum-navigation">
          <Link to="/Home" className="costum-navigation-link" onClick={handleNavLinkClick}>
            <span className="costum-navigation-link-text">{t('home')}</span>
          </Link>
          <Link to="/About" className="costum-navigation-link" onClick={handleNavLinkClick}>
            <span className="costum-navigation-link-text">{t('about')}</span>
          </Link>
          <Link to="/contact" className="costum-navigation-link" onClick={handleNavLinkClick}>
            <span className="costum-navigation-link-text">{t('contactUs')}</span>
          </Link>
          <LanguageSelector />
          <Link to="/Login">
            <button className="costum-btnlogin">{t('login')}</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navb;