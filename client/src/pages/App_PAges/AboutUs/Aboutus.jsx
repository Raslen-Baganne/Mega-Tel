import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { RiTeamFill } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import TextAnimation from '../../../components/Typewritter/Typewriter';
import "./About.css";
import { useTranslation } from 'react-i18next';


function Aboutus() {
    const { t } = useTranslation();
    return (
        <div className="custom-body">
            <div className='custom-abcd'>
                <div className='custom-ovrlaay'>
                    <TextAnimation inputText='About us' className='custom-text-animation' />
                </div>
            </div>

            <div className="custom-about-container">

            <div className="custom-about-content">

<h2>We are a world-leading international company</h2>

<p>
    <span >OVER 7 YEARS OF EXPERIENCE</span><br />
    We deliver quality and reliability! Mega Tel has specialized in processing inbound calls since 2015.
</p>

<p>
    We are successful together with our clients because we carry out the best possible integration of our activities into existing work processes in both temporary and long-term projects.
</p>

<p>
    Our employees make phone calls every day for many companies and in many areas of responsibility.
</p>

<p>
    Our work experience includes tasks such as telephone secretariat, switchboard, order taking, customer service, information service, information and customer care, as well as all back office tasks.
</p>

<p>
    As a professional service center, we deliver tailor-made outsourcing solutions for companies nationally and internationally.
</p>

<p>
    We support you in inbound, market research, sales, sales, lead generation, advertising, whether market research, sales, order acceptance, first level support or complaint management.
</p>

</div>

                <div className="custom-downpart">
                <div class="custom-stats-container">
                    <div className="custom-stat">
                        <RiMoneyPoundCircleFill className='custom-icon' />
                        <h2>1.5</h2>
                        <p>Revenue in 2015-2022 (million)</p>
                    </div>
                    <div className="custom-stat">
                        <RiTeamFill className='custom-icon' />
                        <h2>150+</h2>
                        <p>Colleagues & counting</p>
                    </div>
                    <div className="custom-stat">
                        <FaProjectDiagram className='custom-icon' />
                        <h2>19+</h2>
                        <p>Project successful</p>
                    </div>
                    <div className="custom-stat">
                        <FaAward className='custom-icon' />
                        <h2>7+</h2>
                        <p>Seven years of experience</p>
                    </div>
                </div>
                <div className="custom-partner">
                    <h1>partnership</h1>
                </div>
                </div>


            </div>
        </div>
    )
}

export default Aboutus;
