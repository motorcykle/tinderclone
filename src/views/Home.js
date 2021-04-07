import React from 'react';
import styled from 'styled-components';
import SwipeButtons from '../components/SwipeButtons';
import TinderCards from '../components/TinderCards';


const Home = () => {
  return (
    <HomeContainer>
      <TinderCards />
      <SwipeButtons />
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
