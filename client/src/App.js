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
         <Footer />
    </div>
      <Routes>
      <Route exact path="/" element={<Main/>} />
         <Route exact path="/login" element={<login/>} />
         <Route exact  path="/user" element={<Chat/>} />    
    </Routes></>
  
 
  );
}

export default App;
