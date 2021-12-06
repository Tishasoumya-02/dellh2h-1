import React, { useEffect } from "react";
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {saveMessage} from '../src/_actions/message_actions';

import Message from "./Message";

function ChatAdmin() {
        

    const dispatch=useDispatch();
    const messagesFromRedux=useSelector(state=>state.message.messages);
    
    useEffect(()=>{
        eventQuery('WelcomeAdmin');
    },[]);
        const textQuery = async (text) => {
           
            //the message I sent

            let conversation = {
                who: 'user',
                content:{
                    text:{
                        text: text
                    }
                }
            }
            dispatch(saveMessage(conversation));
            //  console.log("text I sent",conversation);
            //the message by the chat bot
            
            const textQueryVaraiables = {
              text
            }

            try{

                //send request to text query route

                const response = await axios.post('http://28b6-117-205-244-96.ngrok.io/api/dialogflow/textQuery',textQueryVaraiables)
                const content= response.data.fulfillmentMessages[0]

                conversation = {
                    who: 'Chatbot',
                    content:content
                }
                dispatch(saveMessage(conversation));
                // console.log(conversation);
            } 
            catch (error)
            {
                conversation = {
                    who: 'Chatbot',
                    content:{
                        text:{
                            text: "Error just occured" 
                        }
                    }
                }
                dispatch(saveMessage(conversation));
                // console.log(conversation);
            }
        }
       
    
        const eventQuery = async (event) => {
           
          
            //the message by the chat bot
            
            const eventQueryVaraiables = {
              event
            }

            try{

                //send request to text query route

                const response = await axios.post('http://28b6-117-205-244-96.ngrok.io/api/dialogflow/eventQuery',eventQueryVaraiables)
                const content= response.data.fulfillmentMessages[0]

              let conversation = {
                    who: 'Chatbot',
                    content:content
                }
                dispatch(saveMessage(conversation));
                // console.log(conversation);
            } 
            catch (error)
            {
               let conversation = {
                    who: 'Chatbot',
                    content:{
                        text:{
                            text: "Error just occured" 
                        }
                    }
                }
                dispatch(saveMessage(conversation));
                // console.log(conversation);
            }
        }
      
        const keyPressHandler = (e) => {
            if (e.key === "Enter"){
                if(!e.target.value) {
                    return alert('You need to enter something first');
                }
                //we will send request to text query route

                textQuery(e.target.value)

                e.target.vaue = ""
          
          
            }
        }

        const renderOneMessage=(message,i)=>{
            console.log('message',message);
          
            return <Message key={i} who={message.who} text={message.content.text.text} />

        }
        const renderMessage=(returnedMessages)=>{
                   
            if(returnedMessages)
            {
                return returnedMessages.map((message,i) => {
                    return renderOneMessage(message,i);
                })
            }
            else{
                return null;
            }
        }
        return <div >
<div>
             <div className="chat_text">
             <h1 className="chat-text-1">  Hello!</h1>
             <br/>
              <p className ="chat-text-1">This is a simple chatbot. If you have any queries go ahead ask me. Who knows I might be of some help!</p>
              <img className ="chat-text-image" src="https://media3.giphy.com/media/U29zwBYWViOC7QBlJy/giphy.gif?cid=ecf05e47rhn47tmx8nw3km1efxuor2na9b5fr6jlxdd2fv8u&rid=giphy.gif&ct=g" alt="not found"/>
              </div>
            
            <div  style={{
             height: 400, width: 450, 
             border:'3px solid black', borderRadius: '7px'
             }}  className ="chat">
            
                 <div style={{ 
                  height:320, width:'100%', overflow:'auto'
                 }}>
                 

                 {renderMessage(messagesFromRedux)}
                 </div>

                 <input 
                  style = {{
                  margin:20, width:300, height:50,
                  borderRadius: '4px', padding: '2px', fontSize:'1rem' }}

                  placeholder="Send a message..."
                   onKeyPress ={keyPressHandler}
                  type="text" 

                  />

                 <p> <br/><br/><br/><br/><br/><br/></p>
                  
                 

             </div> 
        </div>
        </div>
       
}

export default ChatAdmin;