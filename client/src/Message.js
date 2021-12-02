import React from "react";
import {List,Avatar} from 'antd';
import {Icon} from 'antd';

function Message(props)
{

    const AvatarSrc=props.who==='Chatbot'?<img src="https://media.istockphoto.com/vectors/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-bot-vector-id1073043572?k=20&m=1073043572&s=612x612&w=0&h=WPpV4zW2oxJWS9nseA0IDFthj2IXsE7dbGBrPTGQNOI=" alt="chatbot"/>:<img src="https://banner2.cleanpng.com/20180403/lqq/kisspng-computer-icons-business-service-user-google-accoun-person-with-helmut-5ac35490c7c3a5.1845264615227506088183.jpg" alt="user"/>
    return(
        <List.Item key={props.key} style={{padding:' 1 rem'}}>
                <List.Item.Meta
                  avatar={<Avatar icon={AvatarSrc} />}
                  title={props.who}
                  description={props.text}
                />
            </List.Item>

    )
}
export default Message;