import './Footer.css';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaDiscord, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


function Footer() {
  const { t } = useTranslation();

  

  return (
    <footer className='costum-footer'>
      <div className="costum-grid-wrap">
        <div className="costum-section">
          <aside className="costum-widget-area inner" aria-label="costum-Footer Widget 1">
            <section className="costum-widget">
              <h4>{t('Customer Support 24-7')}</h4>
            </section>
            <section className="costum-widget">
              <p>{t('Monday to Saturday 9:00 AM - 9:00 PM')}</p>
            </section>
          </aside>
        </div>
        <div className="costum-section">
          <aside className="costum-widget-area inner" aria-label="costum-Footer Widget 2">
            <section className="costum-widget">
              <h4>{t('Services')}</h4>
            </section>
            <section className="costum-widget">
              <ul>
                <li><strong>{t('Telephony')}</strong></li>
                <li>{t('Professional phone call answering')}</li>
                <li>{t('24/7 customer support')}</li>
                <li>{t('Inbound and Outbound services')}</li>
                <li><strong>{t('Email Processing')}</strong></li>
                <li>{t('Fast and accurate email processing')}</li>
                <li>{t('Customized email responses')}</li>
                <li>{t('Efficient inquiry management')}</li>
              </ul>
            </section>
          </aside>
        </div>
        <div className="costum-section">
          <aside className="costum-widget-area inner" aria-label="costum-Footer Widget 3">
            <section className="costum-widget">
              <h4>{t('Office in Bulgaria')}</h4>
            </section>
            <section className="costum-widget">
              <p>{t('Knyaz Boris I, 148, Floor 1')}<br/>{t('Region Vazrazhdane, Sofia, Bulgaria')}<br/>{t('ID No.: 206341672')}<br/>{t('VAT No.: BG206341672')}</p>
            </section>
            <section className="costum-widget">
              <ul>
                <li>+49 15215894603<br/>{t('info@mega-tel.de')}<br/>{t('marketing@mega-tel.de')}</li>
              </ul>
            </section>
          </aside>
        </div>
        <div className="costum-section">
          <aside className="costum-widget-area inner" aria-label="Footer Widget 4">
            <section className="costum-widget">
              <h4>{t('Our Locations')}</h4>
            </section>
            <section className="costum-widget">
              <p>{t('Greece')}<br/>{t('Bulgaria')}<br/>{t('Tunisia')}</p>
            </section>
            <div className="costum-footer-col">
              <section className="costum-widget">
                <h4>{t('Follow us')}</h4>
              </section>
              <div className="costum-social-links">
                <a href='facebok.com'><div className="costum-icon-container"><FaFacebookF /></div></a>
                <div className="costum-icon-container"><FaDiscord /></div>
                <div className="costum-icon-container"><FaInstagram /></div>
                <div className="costum-icon-container"><FaLinkedinIn /></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="costum-containerFootr">
        <p className='costum-pa'>
          {t('Copyright © 2024 MegaTel')}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
