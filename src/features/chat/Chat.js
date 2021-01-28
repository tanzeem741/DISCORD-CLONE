import React, { useEffect, useState }from 'react'
import './Chat.css';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Messages from './message/Messages';
import { selectChannelName, selectChannelId } from '../channelSlice';
import db from '../firebase';
import firebase from 'firebase';
import { selectUser } from '../userSlice';




function Chat() {
    const user = useSelector(selectUser);
    const channelId =useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => setMessages(snapshot.docs.map(doc => doc.data()))
                );
        }
    }, [channelId]);
    
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("channels").doc(channelId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user, user
        })

        setInput("");

    };

    console.log(messages);
    return (
 <div className="chat">
            <div className="chat__header chat__header--bg">
                <h3><span class="chat__hash">#</span>{channelName}</h3>
                <div className="chat__header--right">
                    <NotificationsIcon className="chat__icon"/>
                    <BookmarksIcon className="chat__icon"/>
                    <PeopleIcon className="chat__icon"/>
                    <input type="text" className="chat__searchbar chat__searchbar--bg" 
                    placeholder="Search"/>
                    <InboxIcon className="chat__icon"/>
                    <HelpIcon className="chat__icon"/>

                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <Messages timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}/> 
               ))} 
            </div>
            <div className="chat__msg chat__msg--bg">
                <AddCircleIcon className="chat__icon"/>
                <form className="chat__msgBox--1">
                    <input onChange={e =>  setInput(e.target.value)  }
                        disabled={!channelId}
                        value={input}
                        placeholder={`Write some message ! `} 
                        className="chat__msgBox"/>
                    <button disabled={!channelId} type="submit"
                className="chat__inputButton" onClick={sendMessage}>SUBMIT</button>
                </form>
                <CardGiftcardIcon className="chat__icon"/>
                <GifIcon className="chat__icon"/>
                <EmojiEmotionsIcon className="chat__icon"/>
            </div>
        </div>
    )
}
 
export default Chat;
