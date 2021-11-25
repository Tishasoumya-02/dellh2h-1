import React from "react";
import {List,Avatar} from 'antd';
import {Icon} from 'antd';

function Message(props)
{

    const AvatarSrc=props.who==='Chatbot'?<i class="fas fa-comment-alt"></i>:<i class="far fa-smile"></i>
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