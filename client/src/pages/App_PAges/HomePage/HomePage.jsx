import React from 'react';
import './HomePage.css';
import img from '../../../Assets/images/d-3.png';
import img1 from '../../../Assets/images/d-4.png';
import img2 from '../../../Assets/images/d-2.png';
import { FaRecycle } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdDesktopMac } from "react-icons/md";
import { FaRocket } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import TextAnimation from '../../../components/Typewritter/Typewriter';
import { Fade } from "react-awesome-reveal";





function HomePage() {
  const { t } = useTranslation();

  return (
    <div >
      <div className='costum-bigbg'>
      <div className='costum-overlay' >
        <TextAnimation inputText={t("welcome")} />
      </div>
      </div>

      <div className="costum-text-content">
        <Fade direction='down' triggerOnce>
          <h2>{t("header_title")}</h2>
        </Fade>
        <Fade triggerOnce>
          <h3>{t("header_subtitle")}</h3>
        </Fade>
        <Fade direction='up' triggerOnce>
          <p>{t("header_welcomeMessage")}<br />{t("header_welcomeMessage_continue")}</p>
        </Fade>

        <div className='costum-experience'>
          <Fade direction='down' triggerOnce>
            <h1><i>{t("experience_title")}</i></h1>
          </Fade>
          <Fade triggerOnce>
          <h2><em>{t("experience_yearsOfSuccess")}</em></h2>
          </Fade>
          <Fade direction='up' triggerOnce>
            <p>{t("experience_description")}<br />{t("experience_description_continue")}</p>
          </Fade>
        </div>
      </div>


        <div className="costum-info-box">

          <div className="costum-box">

            <p>{t("infoBox_projectsCompleted_title")}</p>
            <p>{t("infoBox_projectsCompleted_text")}</p>

          </div>

          <div className="costum-box">

            <p>{t("infoBox_yearsOfExperience_title")}</p>
            <p>{t("infoBox_yearsOfExperience_text")}</p>

          </div>


          <div className="costum-box">

            <p>{t("infoBox_partnerships_title")}</p>
            <p>{t("infoBox_partnerships_text")}</p>

          </div>
          <div className="costum-box">

            <p>{t("infoBox_employees_title")}</p>
            <p>{t("infoBox_employees_text")}</p>

          </div>

        </div>
        <div className='costum-aziz'>
          <h2>{t("stabilityQuality_title")}</h2>
          <h1><strong>{t("stabilityQuality_qualityService")}</strong></h1>
          <div className="costum-content">

            <figure>
              <img src={img} alt="flexibility" />
              <figcaption><i>{t('title_flexibility')}</i></figcaption>
              <p>{t("stabilityQuality_flexibility")}</p>
            </figure>
            <figure>
              <img src={img2} alt="expertise" />
              <figcaption><i>{t("title_Expertise")}</i></figcaption>
              <p>{t("stabilityQuality_expertise")}</p>
            </figure>
            <figure>
              <img src={img1} alt="technology" />
              <figcaption><i>{t("title_technology")}</i></figcaption>
              <p>{t("stabilityQuality_technology")}</p>
            </figure>
          </div>
        </div>
        <Fade triggerOnce>
          <div className="costum-container">

            <div className='costum-nasri'>

              <h2>{t("sustainability_title")}</h2>
              <p>{t("sustainability_commitment")}</p>
              <span>{t("sustainability_practice")}</span>

            </div>

            <div className='costum-megaa'>
              <h2>{t('title')}</h2>
              <div className='costum-inp'>
                <FaRecycle className='costum-icon' />
                <p>{t('sustainability')}</p>
              </div>
              <div className='costum-inp'>
                <IoTimeSharp className='costum-icon' />
                <p>{t('punctuality')}</p>
              </div>
              <div className='costum-inp'>
                <MdDesktopMac className='costum-icon' />
                <p>{t('technology')}</p>
              </div>
              <div className='costum-inp'>
                <FaRocket className='costum-icon' />
                <p>{t('quality')}</p>
              </div>
            </div>
          </div>
        </Fade>

        <div className='costum-sus'>
          <div className='costum-left'>
            <h3>{t("sustainability_title")}</h3>
            <h1>{t("ourLocations_title")}</h1>
            <p>{t("ourLocations_mainBranches_continue")}</p>
          </div>
          <div className='costum-info-box1'>
            <div className='costum-box1'>
              <h2>{t('Tunisia_title')}</h2>
              <p>{t("ourLocations_tunisia")}</p>
            </div>
            <div className='costum-box1'>
              <h2>{t('Bulgaria_title')}</h2>
              <p>{t("ourLocations_bulgaria")}</p>
            </div>
            <div className='costum-box1'>
              <h2>{t('Worldwide_title')}</h2>
              <p>{t("ourLocations_worldwide")}</p>
            </div>
          </div>
          <div className='costum-three'>
            <Fade direction='up' triggerOnce>
              <p>{t("footer_securedFuture")}</p>
              <h1>{t("footer_leadingCompany")}</h1>
            </Fade>
          </div>
        </div>
     
    </div>
  );
}

export default HomePage;
