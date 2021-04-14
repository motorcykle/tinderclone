import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProfileUID, selectSelectedChat } from '../features/appSlice';
import { selectUser } from '../features/userSlice';
import db from '../firebase';

const OpenChat = () => {
  const chatRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const chat = useSelector(selectSelectedChat);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');

  const matchesDoc = db
    .collection('matches')
    .doc(chat?.id)

  useEffect(() => console.log(messages), [messages])

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msgInput) {
      const message = {
        sender: user?.uid,
        message: msgInput,
        timestamp: firebase.firestore.Timestamp.now()
      }
      matchesDoc.collection('messages').add(message)
      matchesDoc.update({ lastMessage: message });
      setMsgInput('')
    }
  }

  useEffect(() => {
    if (!chat) return;

    const unsubscribe = matchesDoc.collection('messages').onSnapshot(snapshot => {
      const messageDocs = snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
      setMessages(messageDocs);
    })

    return unsubscribe;
  }, [chat])

  return (
    <OpenChatContainer>
      <div className="container">
        <div onClick={() => dispatch(addProfileUID(chat?.data.myMatch.user.uid))}>
          <Avatar className="userAvatar" src={chat.data.myMatch.user.photoURL} />
          <p className="match__text">You matched with {chat.data.myMatch.user.displayName} on {chat.data.timestamp}</p>
        </div>
        <div className="chat">
          {messages.length ? messages.map(message => (
            <p key={message.id} className={`message ${message.data.sender === user?.uid && "myMessage"}`}>
              <span className="msg__name">
                {message.data.sender === user?.uid ? user?.displayName : chat.data.myMatch.user.displayName}
              </span>
              {message.data.message}
              <span className="msg__time">{new Date(message.data.timestamp.toDate()).toDateString()}</span>
            </p>
          )) : ""}
          {/* <p className="message">
            <span className="msg__name">Kylie Jenner</span>
            Hello, how are you?
            <span className="msg__time">19:56:11 lör 10 apr</span>
          </p>
          <p className="message">
            <span className="msg__name">Kylie Jenner</span>
            I've been trying to reach you about you extended warranty.
            <span className="msg__time">19:56:11 lör 10 apr</span>
          </p>
          <p className="message myMessage">
            <span className="msg__name">Mohamed Abd...</span>
            Great.
            <span className="msg__time">19:56:11 lör 10 apr</span>
          </p>
          <p className="message">
            <span className="msg__name">Kylie Jenner</span>
            $599.90
            <span className="msg__time">19:56:11 lör 10 apr</span>
          </p> */}
          <ChatBottom ref={chatRef} />
        </div>
        <form className="chat__form" onSubmit={sendMessage}>
          <input type="text" value={msgInput} onChange={({target}) => setMsgInput(target.value)} placeholder="Type your message here..."/>
          <Button type="submit" variant="contained" color="secondary" className="send__btn">
            Send
          </Button>
        </form>
      </div>
    </OpenChatContainer>
  );
}

export default OpenChat;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`

const OpenChatContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  .container {
    padding: 1em .7em;
    /* text-align: center; */
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .userAvatar {
    margin: 5px auto;
  }
  .match__text {
    font-weight: 400;
    font-size: small;
    color: grey;
    text-align: center;
    margin: 0 auto;

  }
  .chat__form {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    bottom: 20px;
    position: absolute;
    input {
      border: 1px solid grey;
      border-radius: 25px;
      padding: .8em 1.3em;
      font-size: 1rem;
      outline: none;
      width: 50%;
      margin-right: 10px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
  }
  .chat {
    /* padding: 1em .4em; */
    flex: 1;
    
    .message {
      position: relative;
      margin-right: auto;
      max-width: 50%;
      min-width: 100px;
      width: fit-content;
      background-color: #f9f9f9;
      margin-top: 30px;
      margin-bottom: 35px;
      padding: .8em 1em;
      border-radius: 25px;

      span {
        position: absolute;
      }
      .msg__time {
        right: 0;
        bottom: -15px;
        font-size: xx-small;
      }
      .msg__name {
        left: 0;
        top: -15px;
        font-size: x-small;
        font-weight: bold;
      }
    }
    .myMessage {
      margin-right: 0 !important;
      margin-left: auto !important;
      background: rgb(255,112,112);
      background: linear-gradient(90deg, rgba(255,112,112,1) 0%, rgba(252,70,107,1) 100%);
    }
  }
`;