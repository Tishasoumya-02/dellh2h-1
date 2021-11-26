import React from "react";
import{ Link } from 'react-router-dom';

function Header(){
    return <header>
    <h1>CHAT BOT</h1>
    <p>Virtual Assistant</p>
    
     <div class= "header-nav">
         <Link to="/Nav">
           <b> Order-Report </b>
         </Link>
     </div>

    </header>
    }

export default Header;