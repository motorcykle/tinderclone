import { IconButton } from '@material-ui/core';
import { Close, Favorite, FlashOn, Replay, StarRate } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const SwipeButtons = ({ swipe }) => {
  return (
    <SwipeButtonsContainer>
      <div className="container">
      <IconButton id="swipeBtn__replay">
        <Replay  />
      </IconButton>
      
      <IconButton id="swipeBtn__close" onClick={() => swipe("left")}>
        <Close  />
      </IconButton>

      <IconButton id="swipeBtn__starRate">
        <StarRate  />
      </IconButton>
      
      <IconButton id="swipeBtn__favorite" onClick={() => swipe("right")}>
        <Favorite  />
      </IconButton>

      <IconButton id="swipeBtn__flashOn">
        <FlashOn  />
      </IconButton>
      </div>
    </SwipeButtonsContainer>
  );
}

export default SwipeButtons;

const SwipeButtonsContainer = styled.nav`
  border-top: 1px solid #f9f9f9;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em .8em;
  }

  /* Buttons */
  .MuiIconButton-root {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  }

  #swipeBtn__replay {
    color: #f5b748;
  }

  #swipeBtn__close {
    color: #ec5e6f;
  }

  #swipeBtn__starRate {
    color: #62b4f9;
  }

  #swipeBtn__favorite {
    color: #76e2b3;
  }

  #swipeBtn__flashOn {
    color: #915dd1;
  }


`;