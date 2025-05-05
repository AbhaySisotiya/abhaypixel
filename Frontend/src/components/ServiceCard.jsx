import React from "react";
import {Link} from 'react-router-dom'

function ServiceCard({type,title,desc,bedge}) {

    
  return (
        <Link to={`/service/convert/${type}`} className="service">
        {bedge !== "" && bedge !== null && bedge !== undefined ? <div className="bedge">{bedge}</div> : ""}
        <div className="service-img">
          <img src="/logoimg.png"></img>
        </div>
        <div className="service-title">{title}</div>
        <div className="service-para">
          {desc}
        </div>
      </Link>
  );
}

export default ServiceCard;
