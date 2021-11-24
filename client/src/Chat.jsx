import React from "react";

function Chat() {
        
        /*const textQuery = async {text} => {
            //the message we send

            let conversation = {
                who: 'user',
                content:{
                    text:{
                        text: text
                    }
                }
            }
            //the message by the chat bot
            
            const textQueryVaraiables = {
              text
            }

            try{

                //send request to text query route
                const response = await Axios.post('/api/dialogflow/textQuery',textQueryVaraiables)
                response.data = response.data.fulfillmentMessages[0]

                conversation = {
                    who: 'Chatbot',
                    content:content
                }
            } catch (error)
            {
                conversation = {
                    who: 'Chatbot',
                    content:{
                        text:{
                            text: "Error"
                        }
                    }
                }
            }
        }
        const keyPressHandler = {e} => {
            if (e.key === "Enter"){
                if(!e.target.value) {
                    return alert('You need to enter something first')
                }

                //we will send request to text query route
                textQuery(e.target.value)

                e.target.vaue = ""
            }
        }*/

        return <div >

             <div class="chat_text">
             <h1 class="chat-text-1">  Hello!</h1>
             <br/>
              <p class ="chat-text-1">This is a simple chatbot. If you have any queries go ahead ask me. Who knows I might be of some help!</p>
              <img class ="chat-text-image" src="https://media3.giphy.com/media/U29zwBYWViOC7QBlJy/giphy.gif?cid=ecf05e47rhn47tmx8nw3km1efxuor2na9b5fr6jlxdd2fv8u&rid=giphy.gif&ct=g" alt="not found"/>
              </div>
            
            <div  style={{
             height: 400, width: 450, 
             border:'3px solid black', borderRadius: '7px'
             }}  class ="chat">
            
                 <div style={{ 
                  height:320, width:'100%', overflow:'auto'
                 }}>
                 
                 </div>

                 <input 
                  style = {{
                  margin:20, width:300, height:50,
                  borderRadius: '4px', padding: '2px', fontSize:'1rem' }}

                  placeholder="Send a message..."
                  onKeyPress //={keyPressHandler}
                  type="text" 

                  />

                 <p> <br/><br/><br/><br/><br/><br/></p>
                  
                 

             </div> 
        </div>
       
}

export default Chat;