import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { Routes, Route, } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import ChatAdmin from "./ChatAdmin";
import Nav from "./nav";

function App() {

  return (
    <>  <div className="App">
         <Header />
         <Footer />
          </div>
      <Routes>
      <Route exact path="/" element={<Main/>} />
         <Route exact path="/login" element={<Login/>} />
         <Route exact  path="/user" element={<Chat/>} />  
         <Route exact  path="/Adminchat" element={<ChatAdmin/>} /> 
         <Route exact path="/Nav" element={<Nav/>}/>
    </Routes>
    </>
  
 
  );
}

export default App;
