import React from 'react';
import styled from 'styled-components';
import ChatRow from '../components/ChatRow';

const Chats = () => {
  return (
    <ChatsContainer>
      <ChatRow
        id="1"
        name="Kylie Jenner"
        message="Where though and what time. ;)"
        profileImg="http://www.gstatic.com/tv/thumb/persons/532961/532961_v9_bd.jpg"
        timestamp="2 hours ago"
      />
      <ChatRow
        id="12"
        name="Kylie Jenner"
        message="Where though and what time. ;)"
        profileImg="http://www.gstatic.com/tv/thumb/persons/532961/532961_v9_bd.jpg"
        timestamp="2 hours ago"
      />
      <ChatRow
        id="13"
        name="Kylie Jenner"
        message="Where though and what time. ;)"
        profileImg="http://www.gstatic.com/tv/thumb/persons/532961/532961_v9_bd.jpg"
        timestamp="2 hours ago"
      />
      <ChatRow
        id="14"
        name="Kylie Jenner"
        message="Where though and what time. ;)"
        profileImg="http://www.gstatic.com/tv/thumb/persons/532961/532961_v9_bd.jpg"
        timestamp="2 hours ago"
      />
    </ChatsContainer>
  );
}

export default Chats;

const ChatsContainer = styled.div`

`;