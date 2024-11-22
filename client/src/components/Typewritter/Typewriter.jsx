import React, { useState, useEffect } from 'react';
import './Typerwriter.css'; // Import your CSS file for styling
import { useTranslation } from 'react-i18next';

const TextAnimation = ({ inputText }) => {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(t(inputText).substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > t(inputText).length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [inputText, t]);

  return (
    <div className="custom-text-animation">
      <span>{displayedText}</span>
      <span className="custom-cursor" />
    </div>
  );
};

export default TextAnimation;
