import { useTranslation } from 'react-i18next';
import TextAnimation from '../../../components/Typewritter/Typewriter';
import './ContactUs.css';
import Mapp from "../../../components/map/Mapp";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt, FaHome } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

export default function ContactUs() {
    const { t } = useTranslation();

    return (
        <div className='custom-contact-container'>
            <div className='custom-bg'>
                <div className='custom-ovrlay'>
                    <TextAnimation inputText={t('contactUs')} className='custom-text-animation' />
                </div>
                <div className='custom-text-container'>
                    <div className='custom-text'>
                        <Fade direction='down'>
                            <h2>{t('mainBranch')}</h2>
                        </Fade>
                        <Fade>
                            <h3>{t('revolutionize')}</h3>
                        </Fade>
                        <div className='custom-text-part1'>
                            <Fade>
                                <h4><br />{t('elevate')}</h4>
                            </Fade>
                        </div>
                        <Fade direction='up'>
                            <div className='custom-text-part2'>
                                <h4>{t('teamOfExperts')}</h4>
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className="custom-map-address-container">
                    <Fade direction='left'>
                        <div className="custom-map-container">
                            <Mapp />
                        </div>
                    </Fade>
                    <Fade direction='right'>
                        <div className="custom-address-container">
                            <p>
                                <FaHome />{t('address')}: {t('street')}<br />
                                <FaPhoneAlt />{t('phone')}: +4915215894603 <br />
                                <IoMdMail />{t('email')}: info@mega-tel.de, marketing@mega-tel.de
                            </p>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
}
