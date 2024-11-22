// LanguageSelector.jsx

import React, { useState, useEffect } from 'react';
import './LanguageSelector.css'; // Import the CSS file for styling
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const storedLanguage = localStorage.getItem('selectedLanguage'); // Retrieve the stored language from localStorage
  const [selectedLanguage, setSelectedLanguage] = useState(storedLanguage || ''); // Use the stored language, if available

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage); // Change the language using i18next
      localStorage.setItem('selectedLanguage', selectedLanguage); // Store the selected language in localStorage
    }
  }, [selectedLanguage, i18n]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="custom-language-selector">
      <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)} className="custom-select">
        <option value="" disabled hidden>
          {t('language')}
        </option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">Deutsch</option>
        {/* Add more language options as needed */}
      </select>
      <FontAwesomeIcon icon={faGlobe} className="custom-globe-icon" />
    </div>
  );
};

export default LanguageSelector;
