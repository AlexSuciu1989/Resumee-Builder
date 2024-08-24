import React, { useContext } from 'react';
import { DataContext } from "./DataContex"
// import './Header.css'

import mail from "./ico/envelope-solid.svg";
import home from "./ico/location-dot-solid.svg";
import phone from "./ico/phone-solid.svg";
import website from "./ico/globe-solid.svg";
import whatsapp from "./ico/whatsapp-brands-solid.svg";
import linkedin from "./ico/linkedin-brands-solid-purple.svg";


function Header () {

    const { data, loading, error } = useContext(DataContext);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
<div>
    {data['cv-header'].map((item, index) => (
               <div className="resumee-header" key={index}>
               <h1 className="name" >{item.name}</h1>
               <div className="header-info">
                 <p>
                   <img src={home} className="icon" alt="home icon" itemType='svg'></img>
                   <span className="titles">Home:</span> {item.home}
                 </p>
                 <p>
                   <img src={mail} className="icon" alt="mail icon"></img>
                   <span className="titles">Email:</span> {item.email}
                 </p>
                 <p>
                   <img src={phone} className="icon" alt="phone icon"></img>
                   <span className="titles">Phone:</span> {item.phone}
                 </p>
                 <p>
                   <img src={website} className="icon" alt="website icon"></img>
                   <span className="titles">Website:</span> {item.website}
                 </p>
                 <p>
                   <img src={whatsapp} className="icon" alt="whatsapp icon"></img>
                   <span className="titles">WhatsApp Messenger:</span> {item.whatsapp}
                 </p>
                 <p>
                   <img src={linkedin} className="icon" alt="linkedin icon"></img>
                   <span className="titles">LinkedIn:</span> {item.linkedin}
                 </p>
                 <div className='header-subcontainer'>
                   <p>
                     <span className="titles">Gender:</span> {item.gender}
                   </p>
                   <p>
                     <span className="titles">Date of birth:</span> {item.date_of_birth}
                   </p>
                   <p>
                     <span className="titles">Nationality:</span> {item.nationality}
                   </p>
                 </div>
         
                 <h2 className="about-me-title sub-title">ABOUT ME</h2>
                 <p className='about-me-desc' dangerouslySetInnerHTML={{ __html: item.about_me.replace(/\n/g, '<br/>') }} />
               
               </div>
             </div>
    ))}
</div>
        
 
    )
}


export default Header