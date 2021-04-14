import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatRow from '../components/ChatRow';
import { selectUser } from '../features/userSlice';
import db from '../firebase';

const Chats = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = db
    .collection('matches')
    .where('participants', 'array-contains', user?.uid)
    .onSnapshot(snapshot => {
      console.log(snapshot)
      const chatDocs = snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
      fixUpChats(chatDocs);
    })

    return unsubscribe;
  }, [user]);

  const fixUpChats = async (chats) => {
    const chatsTing = await Promise.all(chats.map(async (chat) => {
      let notMe = chat.data.participants.find(uid => uid !== user?.uid);
      const notMeData = await db.collection('users').doc(notMe).get();
      const opened = notMeData.data();
      let lastMessageTing = null;
      if (chat.data.lastMessageTing) {
        lastMessageTing = {...chat.data.lastMessageTing, timestamp: new Date(chat.data.lastMessage.timestamp.toDate()).toDateString()}
      }
      return {...chat, data: {...chat.data, lastMessage: lastMessageTing, timestamp: new Date(chat.data.timestamp.toDate()).toDateString(), myMatch: {user: opened.user, profile: opened.profile}}}
    }))
    setChats(chatsTing);
  }

  useEffect(() => { console.log(chats) }, [chats])

  return (
    <ChatsContainer>
      {chats.length ? chats.map(({id, data}) => (
        <ChatRow key={id} data={data} id={id} />
      )) : ''}
    </ChatsContainer>
  );
}

export default Chats;

const ChatsContainer = styled.div`
  flex: 1;
  width: 100%;
`;