import { IconButton } from '@material-ui/core';
import { Forum, Person } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const HomeHeader = () => {
  return (
    <HeaderContainer>
      <div className="container">
      <IconButton>
      <Person />
      </IconButton>

      <img src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/tinder.png" alt="" id="header__logo"/>
      
      <IconButton>
      <Forum />
      </IconButton>
      </div>
    </HeaderContainer>
  );
}

export default HomeHeader;

const HeaderContainer = styled.nav`
  border-bottom: 1px solid #f9f9f9;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7.5px 0;
  }

  #header__logo {
    max-height: 50px;
    object-fit: contain;
  }
`;