import React from "react";
import { Link } from "react-router-dom";
import  './style.css';
function login(){
    function moveToAdmin()
    {
      <Link to="/Adminchat"/>
        
    }
    return (

      
    <div className="login-main">
        <div className="lm">
         <div  style={{
             height: 300, width: 350, 
             border:'5px solid black', borderRadius: '7px'
             }} className="login-box">

             <form onSubmit={moveToAdmin} >
                 <label className="login-text" for="login">   <b>Please Enter The Key</b>    </label><br/>
                 <input type = "number" name="login " value="login" />
                 <input type="submit" value="submit"/>
             </form>
        
             <img src="https://cdn.dribbble.com/users/634508/screenshots/5058273/media/81e8b38e8346fb7402ee98525ee4ab5a.gif" 
              alt="not found" className="login-img"/>
         </div> 
         </div>
    </div>
    )
}

export default login;
