import React from 'react';
import paw from '../images/paw.png';
import {Picture} from 'react-responsive-picture';

export default function() {
  return (
    <div className="site-footer">
        <p>  
          <Picture src={paw} alt="Adopt a dog" className="footerImg" />
           Built by a wonderful developer for <b><a href="https://www.asana.com">Asana.</a></b>
        </p>
    </div>  
  )
}
