import { Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const ChatRow = ({ name, message, profileImg, timestamp, id }) => {
  const history = useHistory();

  return (
    <ChatRowContainer onClick={() => history.push(`/chat/${id}`)}>
      <div className="container">
        <Avatar src={profileImg} />

        <div id="user__text">
          <h3>{name}</h3>
          <p>{message}</p>
        </div>

        <small>{timestamp}</small>
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