import React from 'react';


import 'leaflet/dist/leaflet.css';

export default function Mapp() {


  return (
    <>
      <div className='mapp'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d46914.809938703154!2d23.288047!3d42.700002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1709590966249!5m2!1sen!2sus" width="700" height="450"
          style={{

            marginTop: "4px",
            border: "3px solid #FF6A3D",
            borderRadius: "7px"
          }}

          allowFullScreen=""
          loading="lazy"

          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

    </>
  );

}
