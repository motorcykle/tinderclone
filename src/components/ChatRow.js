import { Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addSelectedChat, removeSelectedChat } from '../features/appSlice';

const ChatRow = ({ data, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectedChat = () => {
    dispatch(removeSelectedChat());
    dispatch(addSelectedChat({id, data}));
    history.push(`/chat/${data.myMatch.user.displayName.toLowerCase().split(' ').join('')}`);
  }

  return (
    <ChatRowContainer onClick={selectedChat}>
      <div className="container">
        <Avatar src={data.myMatch.user.photoURL} />

        <div id="user__text">
          <h3>{data.myMatch.user.displayName}</h3>
          <p>{data.lastMessage?.message && ''}</p>
        </div>

        <small>{data.lastMessage ? data.lastMessage.timestamp : data.timestamp}</small>
      </div>
    </ChatRowContainer>
  );
}

export default ChatRow;

const ChatRowContainer = styled.div`
  padding: 20px;
  border: 1px solid #f9f9f9;
  cursor: pointer;
  :hover {
    background-color: #f9f9f9;
  }

  .container {
    display: flex;
    align-items: center;

    #user__text {
      flex: 1;
      margin-left: 10px;
      > p {
        margin-top: 5px;
        color: grey;
      }
    }

    small {
      color: lightgrey;
      font-weight: bold;
    }
  }
`;