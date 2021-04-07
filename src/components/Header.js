import { IconButton } from '@material-ui/core';
import { ArrowBackIos, Forum, Person } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HomeHeader = ({ backButton }) => {
  const location =  useLocation()

  return (
    <HeaderContainer>
      <div className="container">
      {!backButton ? (
        <Link to="/profile">
          <IconButton>
          <Person />
          </IconButton>
        </Link>
      ) : (
        <Link to={`${backButton}`}>
          <IconButton>
          <ArrowBackIos />
          </IconButton>
        </Link>
      )}

      <Link to="/">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/tinder.png" alt="" id="header__logo"/>
      </Link>

      {location.pathname === '/chat' ? (
        <Link to="/profile">
          <IconButton>
          <Person />
          </IconButton>
        </Link>
      ) : (
        <Link to="/chat">
          <IconButton>
          <Forum />
          </IconButton>
        </Link>
      )}

      
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