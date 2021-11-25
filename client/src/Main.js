import React from "react";
import  './style.css';
import{ Link } from 'react-router-dom';

function Main(){


    return  <div>
  
         <h2  className="middletext-1">Welcome to the chat bot!</h2>
         <p className="middletext-2">Please click, to proceed ahead!</p>

            <div className="middle"> 
             <div className="middleadmin">
              <Link to="/login">
                 <button type="button" className="btn">Admin</button>
              </Link>
              </div>
 

             <div className="middleimg">
                 <img 
                  src="https://helios-i.mashable.com/imagery/articles/03zX67jASxXoyzvY5L1Sc7y/images-1.fit_lim.size_2000x.v1611689184.gif"
                  alt="not found"
                  />
             </div>


              <div className="middleuser">
              <Link to="/user">
                 <button type="button" className="btn">User</button>
              </Link>  
              </div>  


             
             
         </div>
     </div>  
}

export default Main;