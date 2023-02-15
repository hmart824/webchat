import React , {useState , useEffect, useRef  } from 'react';
import { useNavigate , useParams } from 'react-router';
import { IoSendSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import './Chatcontainer.css'
import Chatmessage from './Chatmessage'
import EmojiPicker from 'emoji-picker-react';
import db from '../firebase';
import firebase from 'firebase';


function Chatcontainer(props) {

    const [chatUser, setChatUser] = useState([]);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const {chatUserEmail} = useParams();
    const chatBox  = useRef(null);
   
    useEffect(()=>{
        const getUser = async ()=>{
            await db.collection('users').doc(chatUserEmail).onSnapshot((snapshot)=>{
                setChatUser(snapshot.data());
            })
        };
        getUser();

        const getMessages = async ()=>{
            await db.collection('chats').doc(chatUserEmail).collection('messages').orderBy('timeStamp' , 'asc').onSnapshot((snapshot)=>{
                let messages = snapshot.docs.map((doc)=> doc.data());

                let newMessages = messages.filter((message)=>
                    message.senderEmail === (props.currentUser.email || chatUserEmail) || message.receiverEmail === (props.currentUser.email || chatUserEmail)
                )
                setChatMessages(newMessages);

            })
        }
        getMessages();

    },[chatUserEmail , props.currentUser.email]);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", async (event) => {
      const { currentTarget: target } = event;
      await target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);

    const send = (e)=>{
        e.preventDefault();
        if(chatUser.email && message !== ""){
            let payload = {
                text: message,
                senderEmail: props.currentUser.email,
                receiverEmail: chatUser.email,
                timeStamp: firebase.firestore.Timestamp.now()
            };
            //sender
            db.collection('chats').doc(props.currentUser.email).collection('messages').add(payload)

            //receiver
            db.collection('chats').doc(chatUser.email).collection('messages').add(payload)

            //friend list of current user
            db.collection('friendList').doc(props.currentUser.email).collection('list').doc(chatUser.email).set({
                email: chatUser.email,
                fullname: chatUser.fullname,
                photoURL: chatUser.photoURL,
                userId: chatUser.userId,
                lastMessage: message
            });

            //friend list of chat user
            db.collection('friendList').doc(chatUser.email).collection('list').doc(props.currentUser.email).set({
                email: props.currentUser.email,
                fullname: props.currentUser.fullname,
                photoURL: props.currentUser.photoURL,
                userId: props.currentUser.userId,
                lastMessage: message
            });
            setMessage("");

        }
        
    }
  
    const [openEmojiBox, setopenEmojiBox] = useState(false);
    const emojiBox = ()=>{
        setopenEmojiBox(!openEmojiBox);
    }
    const navigate = useNavigate();
    const backToHome = ()=>{
        navigate('/');
    }
  return (
  
        <div className="chat-container">
            <div className="chat-container-header">
                <div className="chat-user-info">
                <BiArrowBack onClick={backToHome}/>
                    <div className="chat-user-img">
                        <img src={chatUser.photoURL} alt="/user.png" />
                    </div>
                    <p>{chatUser.fullname}</p>
                </div>
            </div>
            <div className="chat-display-container" ref={chatBox}>
                {
                    chatMessages.map((message,key)=>
                         (
                            <Chatmessage message={message.text} key={key} time={message.timeStamp} sender={message.senderEmail} />
                        )
                    )
                }
                    
                   
            </div>
            <div className="chat-input">
                {openEmojiBox && <EmojiPicker onEmojiClick={(emojiData, event)=>{
                    setMessage(message + emojiData.emoji)
                }}/>}
                <div className="chat-input-btn">
                    <div className="emoji" onClick={emojiBox}>
                        {openEmojiBox ? <i class="bi bi-x-circle"></i> : <i className="bi bi-emoji-smile"></i>}
                    </div>
                    <i className="bi bi-paperclip"></i>
                </div>
                <form onSubmit={send}>
                    <input type="text" placeholder="Type a Message" value={message} onChange={(e)=>{
                        setMessage(e.target.value);
                    }}/>
                </form>
                <div className="send-btn" onClick={send}>
                  <IoSendSharp/>
                </div>
            </div>
        </div>
    
  )
}

export default Chatcontainer