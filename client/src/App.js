import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { Routes, Route, } from "react-router-dom";
import login from "./Login";
import Chat from "./Chat";

function App() {

  return (
    <>  <div className="App">

         <Header />
         <Main/>
         <Footer />
    </div>
      <Routes>
   
         <Route  path="/login" element={<login/>} />
         <Route  path="/user" element={<Chat/>} />
        {/* <Chatbot/> */}
      
    
    </Routes></>
  
 
  );
}

export default App;
